import baseModel from '../submodules/RNProjectTools/dva/baseModel';

const testModel = 'testModel';
const initState = {
  pageName: 'HomePages',
};
export const effects = {
  saveSomeThing: `testModel/${baseModel.baseEffects.saveSomeThing}`, //每个model默认的同步的直接改变此 model 的某个 state 的 effect
  awaitSaveSomeThing: `testModel/${baseModel.baseEffects.awaitSaveSomeThing}`, //异步获取数据改变 某个 state
};
export const _action = {
  ...baseModel.baseAction,

  pageName: 'pageName',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: testModel,
  state: initState,
  attributesToBeCached: [_action.pageName], //被缓存的数据的key
  effects: {},
};
