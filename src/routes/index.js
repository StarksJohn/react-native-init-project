import routes from './routes.js';
import SecondStack from './SecondStack.js';
import MainStack from './MainStack';
import DrawerContent from './DrawerContent.js';
import NavigationContainer from './NavigationContainer';

/**
 * import { NavigationContainer } from '@routes';
 * note: Other files in the current directory cannot import {} from'@routes',Will be undefined due to repeated references
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
module.exports = {
  NavigationContainer,
  routes,
  SecondStack,
  MainStack,
  DrawerContent,
};
