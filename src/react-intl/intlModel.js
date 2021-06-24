import {EN, MOMENT_LOCALE} from './locale';
import messages from './messages/messages';
import baseModel from '../submodules/RNProjectTools/dva/baseModel';

const intlModel = 'intlModel';
const initState = {
  intlLocale: EN,
  locale: EN,
  messages: messages[EN],
  momentLocale: MOMENT_LOCALE,
  initialNow: Date.now(),
  setLocaleCompleted: false,
};
export const effects = {
  saveSomeThing: `intlModel/${baseModel.baseEffects.saveSomeThing}`, //每个model默认的同步的直接改变此 model 的某个 state 的 effect
};
export const action = {
  ...baseModel.baseAction,
  locale: 'locale',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: intlModel,
  state: initState,
  attributesToBeCached: [action.locale], //被缓存的数据的key
  effects: {},
};
