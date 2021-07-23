import dvaApp from './dvaApp.js';
import ThemeContextModel from './ThemeContextModel';
import DrawerNavigatorModel from './DrawerNavigatorModel.js';
import netInfoModel from './netInfoModel/netInfoModel.js';

/**
 * import { dvaApp } from '@dva';
 * note: Other files in the current directory cannot import {} from'@dva',Will be undefined due to repeated references
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
module.exports = {
  dvaApp,
  ThemeContextModel,
  DrawerNavigatorModel,
  netInfoModel,
};
