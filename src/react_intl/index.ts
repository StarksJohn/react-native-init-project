import _IntlWrapper from './IntlWrapper'
import _intlModel from './intlModel.js'
import * as _locale from './locale.js'

/**
 * import {  } from '~react_intl'
 * note: Other files in the current directory cannot import {} from'@react_intl',Because it will be undefined
 * @type {{dvaApp: {_models: *[], _store: null, _plugin: Plugin, use: *, start: (function(): void), model: (function(Object): *)}}}
 */
export const IntlWrapper = _IntlWrapper
export const intlModel = _intlModel
export const locale = _locale
