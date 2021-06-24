import {dva, models} from '@RNProjectTools';
import netInfoModel from './netInfoModel/netInfoModel';
import intlModel from '../react-intl/intlModel';
import bannerModel from './bannerModel/bannerModel';

/**
 * 初始化dva 模块
 * @type {{_models: [*], _store: null, _plugin: Plugin, use: *, start: function(): void, model: function(Object): *}}
 */
const dvaApp = dva.createApp({
  models: models([netInfoModel, intlModel, bannerModel]),
  enableLog: false,
});

export default dvaApp;
