import { DefaultRootState } from 'react-redux'
import { asyncStorage } from 'react-native-common-tools'
import { dvaApp as _dvaApp } from 'react-cacheable-dva'

import _ThemeContextModel, { ThemeContextModelProps } from './ThemeContextModel'
import _DrawerNavigatorModel, { DrawerNavigatorModelProps } from './DrawerNavigatorModel'
import _netInfoModel, { netInfoModelProps } from './netInfoModel/netInfoModel'
import _userModel, { userModelProps } from './userModel'
import _intlModel, { intlModelProps } from './intlModel'

/**
 * import {  } from '~dva'
 * note: Other files in the current directory cannot import {} from'~dva',Will be undefined due to repeated references
 */
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

const initDva = () => {
  console.log('dva initDva() ')
  return _dvaApp([ThemeContextModel, DrawerNavigatorModel, netInfoModel, userModel, intlModel],
    // @ts-ignore
    (key: string) => {
      console.log('initDva getCache key=', key)
      return asyncStorage.getItem(key)
    }, (key: string, value: string) => {
      console.log('initDva cacheFunc key=', key, ' value=', value)
      asyncStorage.setItem(key, value).then()
    })
}
export const dvaApp = initDva()
