import { ThemeContext } from './themeContext';

/**
 * import { ThemeContext } from '@/context';
 * note: Other files in the current directory cannot import {} from'@/context',Will be undefined due to repeated references
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
module.exports = {
  ThemeContext,
};
