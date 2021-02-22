/* eslint-disable consistent-return */
import _ from 'lodash';
import {objTools, tool, asyncStorage} from 'RNProjectTools';
import baseModel from './baseModel';

function replaceArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
}

function concatArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function mergeState(
  preState = {},
  newState = {},
  doMerge = false,
  arrayMerge = 'append',
) {
  const {viewHashString: preHash} = preState;
  const {viewHashString: newHash} = newState;

  // 数据没有变化
  if (objTools.isNotEmpty(newHash) && preHash === newHash) {
    return null;
  }

  // 不进行merge操作
  if (!doMerge) {
    return newState;
  }

  // merge 对象, 不指定array的merge方法，默认为concat data to legacy array
  const processor = arrayMerge === 'replace' ? replaceArray : concatArray;
  // 小程序下没问题，但是H5中，redux做的浅比较，ajax会有问题
  // const result = mergeWith(preState, newState, processor)
  const result = _.mergeWith({}, preState, newState, processor);
  console.log('merged result', result);

  return result;
}

/**
 * 缓存 initState 的某个属性,如果这个属性再 attributesToBeCached 里注册了的话
 * @param key
 */
const cacheAnAttributeOfInitState = async ({
  key,
  value,
  attributesToBeCached,
}) => {
  let index = _.indexOf(attributesToBeCached, key);
  if (index !== -1) {
    console.log('modelTools.js 开始缓存 initState.', key, ' 的值=', value);
    await tool.to(asyncStorage.setItem(key, value));
  }
};

/**
 * 创建默认model
 * https://dvajs.com/api/#model
 * @param namespace
 * @returns {{effects: {}, namespace: *, reducers: {clear(): {}, save(*=, {payload: *}): *, saveSomeThing(*, {payload: *}): *}, state: {}}}
 */
const createDefault = (namespace) => ({
  namespace,
  state: {},
  effects: {
    //通用的 具体控件发起的 effect,把 payload 发给对应的 reducer, 并且如果 action 在 attributesToBeCached 里注册过,就缓存 action 对应的 数据
    *[baseModel.baseEffects.saveSomeThing](
      {action, payload, callback},
      {put, call, select},
    ) {
      console.log(
        'modelTools.js effects saveSomeThing payload=',
        payload,
        ' action =',
        action,
      );
      // const state = yield select((state) => state) //这里就获取到了当前state
      // console.log('testModel.js effects  全局state=', state)

      yield put({type: action, payload});
      yield cacheAnAttributeOfInitState({
        key: action,
        value: payload,
        attributesToBeCached: baseModel.attributesToBeCached,
      });
    },
  },
  reducers: {
    clear() {
      return {};
    },
    saveSomeThing(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, {payload}) {
      const {statInPage, arrayMerge, refresh, ...resp} = payload;
      const doMerge = refresh ? false : statInPage;
      const result = mergeState(state, resp, doMerge, arrayMerge);
      return result || state;
    },
  },
  /**
   * https://segmentfault.com/a/1190000039180929
   * 如果你需要订阅一些数据，并且处理数据后的逻辑仅与当前model相关，那么就应该用 subscriptions
   * subscripitons内的方法，无论任何命名，都会自动执行
   * subscriptions 中配置的只能dispatch所在model的reducer和effects。
   * subscriptions 中配置的函数只会执行一次，也就是在调用 app.start() 的时候，会遍历所有 model 中的 subscriptions 执行一遍。
   * subscriptions 中配置的函数需要返回一个函数，该函数应该用来取消订阅的该数据源。
   * history: react-router中的 history
   */
  subscriptions: {
    //初始化缓存
    initCache: ({dispatch, history}) => {
      return baseModel.baseSubscriptions.initCache({
        dispatch,
        history,
        attributesToBeCached: baseModel.attributesToBeCached,
      });
    },
  },
});

const ModelTools = {
  mergeState,
  createDefault,
};
export default ModelTools;
