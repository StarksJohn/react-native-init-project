import { DefaultRootState } from 'react-redux'
import { dvaApp as _dvaApp } from 'react-cacheable-dva'
import _userModel, { userModeProps } from './userModel'
import { asyncStorage } from 'react-native-common-tools'
import _intlModel, { intlModelProps } from './intlModel'
import _netInfoModel, { netInfoModelProps } from './netInfoModel'
import _ThemeContextModel, { ThemeContextModelProps } from './ThemeContextModel'
import _DrawerNavigatorModel, { DrawerNavigatorModelProps } from './DrawerNavigatorModel'
import _bannerModel, { bannerModelProps } from './bannerModel/bannerModel'
import _useBannerModel from './bannerModel/useBannerModel'

/**
 * import {  } from '~dva'
 * note: Other files in the current directory cannot import {} from'~dva',Will be undefined due to repeated references
 */
export const intlModel = _intlModel
export const netInfoModel = _netInfoModel
export const ThemeContextModel = _ThemeContextModel
export const DrawerNavigatorModel = _DrawerNavigatorModel
export const userModel = _userModel
export const bannerModel = _bannerModel
export const useBannerModel = _useBannerModel

export interface dvaState extends DefaultRootState {
  userModel: userModeProps,
  intlModel: intlModelProps,
  netInfoModel: netInfoModelProps,
  ThemeContextModel: ThemeContextModelProps,
  DrawerNavigatorModel: DrawerNavigatorModelProps,
  bannerModel:bannerModelProps,
}

const initDva = () => {
  console.log('dva initDva() ')
  return _dvaApp(
    // @ts-ignore
    [userModel, intlModel, netInfoModel, ThemeContextModel, DrawerNavigatorModel, bannerModel],
    // @ts-ignore
    (key: string) => {
      console.log('initDva getCache key=', key)
      return asyncStorage.getItem(key)
    },
    (key: string, value: string) => {
      console.log('initDva cacheFunc key=', key, ' value=', value)
      asyncStorage.setItem(key, value).then()
    }
  )
}
export const dvaApp = initDva()
