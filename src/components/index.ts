import _SafeView from './SafeView'
import _CustomNavigationBar from './CustomNavigationBar'

/**
 * import {  } from '~components';
 * note: Other files in the current directory cannot import {} from'@components',Will be undefined due to repeated references
 */
export const SafeView = _SafeView
export const CustomNavigationBar = _CustomNavigationBar
