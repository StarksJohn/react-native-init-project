import _dvaApp from './dvaApp'
import _ThemeContextModel, { ThemeContextModelProps } from './ThemeContextModel'
import _DrawerNavigatorModel, { DrawerNavigatorModelProps } from './DrawerNavigatorModel'
import _netInfoModel, { netInfoModelProps } from './netInfoModel/netInfoModel'
import _userModel, { userModelProps } from './userModel'
import _intlModel, { intlModelProps } from './intlModel'
import { DefaultRootState } from 'react-redux'

/**
 * import {  } from '~dva'
 * note: Other files in the current directory cannot import {} from'~dva',Will be undefined due to repeated references
 */
export const dvaApp = _dvaApp
export const ThemeContextModel = _ThemeContextModel
export const DrawerNavigatorModel = _DrawerNavigatorModel
export const netInfoModel = _netInfoModel
export const userModel = _userModel
export const intlModel = _intlModel
export interface dvaState extends DefaultRootState{
    ThemeContextModel:ThemeContextModelProps,
    DrawerNavigatorModel:DrawerNavigatorModelProps,
    netInfoModel:netInfoModelProps,
    userModel:userModelProps,
    intlModel:intlModelProps
}
