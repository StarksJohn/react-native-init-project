import _routes from './routes'
import _SecondStack from './SecondStack.js'
import _MainStack from './MainStack'
import _DrawerContent from './DrawerContent'
import _NavigationContainer from './NavigationContainer'

/**
 * import {  } from '~routes';
 * note: Other files in the current directory cannot import {} from'~routes',Will be undefined due to repeated references
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
export const NavigationContainer = _NavigationContainer
export const routes = _routes
export const SecondStack = _SecondStack
export const MainStack = _MainStack
export const DrawerContent = _DrawerContent
