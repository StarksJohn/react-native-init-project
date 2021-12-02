import _useThemeContext from './useThemeContext'
import _useNetInfoModel from './useNetInfoModel'
import { useDrawerNavigator as _useDrawerNavigator } from './useDrawerNavigator'
import _useNavFocusListener from './useNavFocusListener'
// import _useBannerModel from './useBannerModel'
import _useIntlModel from './useIntlModel'
import _useThemeContextModel from './useThemeContextModel'

/**
 * import {  } from '~useHooks';
 * note: Other files in the current directory cannot import {} from'~useHooks',Will be undefined due to repeated references
 */
export const useThemeContext = _useThemeContext
export const useNetInfoModel = _useNetInfoModel
export const useDrawerNavigator = _useDrawerNavigator
export const useNavFocusListener = _useNavFocusListener
// export const useBannerModel = _useBannerModel
export const useIntlModel = _useIntlModel
export const useThemeContextModel = _useThemeContextModel
