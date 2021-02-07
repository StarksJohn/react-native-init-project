import {tool, baseDva} from 'RNProjectTools';

const testModel = 'testModel';
const initState = {
  pageName: 'HomePages',
};
export const effects = {
  ...baseDva.baseModel.baseEffects,
  test: `${testModel}/test`,
};
export const action = {
  pageName: 'pageName',
};
/**
 * 将要被缓存的属性,只需要在此添加key 以及在 effect 方法里 统一调
 * yield put({
        type: effects.cacheAnAttributeOfInitState,
        action,
        payload,
   });
    这个key 对应的value 就会 自动缓存 和 初始化
 * @type {string[]}
 */
const attributesToBeCached = [action.pageName];
/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: testModel,
  state: initState,
  effects: {
    //通用方法,把 payload 发给对应的 reducer, 如果 action 在 attributesToBeCached里注册过,就缓存 action 对应的 数据
    *[effects.cacheAnAttributeOfInitState](
      {action, payload, callback},
      {put, call, select},
    ) {
      console.log(
        'testModel.js effects cacheAnAttributeOfInitState payload=',
        payload,
      );
      const state = yield select((state) => state); //这里就获取到了当前state
      console.log('testModel.js effects  全局state=', state);

      yield put({type: action, payload});
      tool.cacheAnAttributeOfInitState({
        key: action,
        value: payload,
        attributesToBeCached,
      });
    },
    *test({action, payload, callback}, {put, call, select}) {
      console.log('testModel.js effects test payload=', payload);

      yield put({
        type: effects.cacheAnAttributeOfInitState,
        action,
        payload,
      });

      callback('ok');
    },
  },
  reducers: {
    [action.pageName](state, {payload}) {
      console.log('testModel.js reducers pageName payload=', payload);
      return {
        ...state,
        pageName: payload,
      };
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
      return baseDva.baseModel.baseSubscriptions.initCache({
        dispatch,
        history,
        attributesToBeCached,
      });
    },
  },
};
