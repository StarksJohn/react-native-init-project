import { dva, models } from '@RNProjectTools';
import bannerModel from './bannerModel/bannerModel';
import ThemeContextModel from './ThemeContextModel';
import DrawerNavigatorModel from './DrawerNavigatorModel.js';
import { intlModel } from '@react_intl';
import netInfoModel from './netInfoModel/netInfoModel.js';

/**
 * 初始化dva 模块
 * @type {{_models: [*], _store: null, _plugin: Plugin, use: *, start: function(): void, model: function(Object): *}}
 */
const dvaApp = dva.createApp({
  models: models([netInfoModel, intlModel, bannerModel, DrawerNavigatorModel, ThemeContextModel]),
  enableLog: false,
});

export default dvaApp;
