import DetailsPage from './DetailsPage.js';
import WelcomePage from './WelcomePage.js';
import HomePage from './HomePage.js';
import MinePage from './MinePage.js';

/**
 * import {  } from '@pages';
 * note: Other files in the current directory cannot import {} from'@routes',Will be undefined due to repeated references
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
module.exports = {
  DetailsPage,
  WelcomePage,
  HomePage,
  MinePage,
};
