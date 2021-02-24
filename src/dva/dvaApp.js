import {dva, models} from 'RNProjectTools';
import testModel, {action as testModel_Actions} from './testModel';
import netInfoModel from './netInfoModel';

/**
 * 初始化dva 模块
 * @type {{_models: [*], _store: null, _plugin: Plugin, use: *, start: function(): void, model: function(Object): *}}
 */
const dvaApp = dva.createApp({
  models: models([testModel, netInfoModel]),
  enableLog: false,
  attributesToBeCached: [testModel_Actions.pageName], //注册需要被缓存的数据
});

export default dvaApp;
