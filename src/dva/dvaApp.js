import { dva, models } from '@RNProjectTools';
// import netInfoModel from './netInfoModel/netInfoModel';
import bannerModel from './bannerModel/bannerModel';
import { DrawerNavigatorModel, intlModel, netInfoModel } from '@/AllExports';
console.log('dvaApp.js netInfoModel=', netInfoModel);

/**
 * 初始化dva 模块
 * @type {{_models: [*], _store: null, _plugin: Plugin, use: *, start: function(): void, model: function(Object): *}}
 */
const dvaApp = dva.createApp({
  models: models([netInfoModel, intlModel, bannerModel, DrawerNavigatorModel]),
  enableLog: false,
});

export default dvaApp;
