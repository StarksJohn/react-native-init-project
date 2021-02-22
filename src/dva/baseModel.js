import _ from 'lodash';
import {objTools, tool, asyncStorage} from 'RNProjectTools';

import {action as testModel_Actions} from './testModel';

/**
 *  * https://dvajs.com/api/#model
 */
export default {
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
  attributesToBeCached: [testModel_Actions.pageName],
  baseEffects: {
    saveSomeThing: 'saveSomeThing', //具体控件发的 effect,有 缓存 initState 的某个属性 作用
  },
  baseSubscriptions: {
    //初始化缓存
    initCache: ({dispatch, history, attributesToBeCached}) => {
      console.log(
        'baseModel.js subscriptions initCache dispatch=',
        dispatch,
        ' attributesToBeCached=',
        attributesToBeCached,
      );
      _.forEach(attributesToBeCached, async (key) => {
        console.log('baseModel.js initCache forEach key=', key);
        const [e_value, value] = await tool.to(asyncStorage.getItem(key));
        console.log(
          'baseModel.js initCache forEach getItem key=',
          key,
          ' value=',
          value,
        );
        if (objTools.isNotEmpty(value)) {
          dispatch({type: key, payload: value});
        }
      });
    },
  },
};
