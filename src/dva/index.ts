import _dvaApp from './dvaApp'
import _ThemeContextModel from './ThemeContextModel'
import _DrawerNavigatorModel from './DrawerNavigatorModel.js'
import _netInfoModel from './netInfoModel/netInfoModel.js'
import _userModel from './userModel.js'

/**
 * import {  } from '~dva'
 * note: Other files in the current directory cannot import {} from'~dva',Will be undefined due to repeated references
 */
export const dvaApp = _dvaApp
export const ThemeContextModel = _ThemeContextModel
export const DrawerNavigatorModel = _DrawerNavigatorModel
export const netInfoModel = _netInfoModel
export const userModel = _userModel
