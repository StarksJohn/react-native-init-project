import {EN, MOMENT_LOCALE} from './locale';
import messages from './messages/index';

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
  saveSomeThing: `${intlModel}/saveSomeThing`,
};
export const action = {
  locale: `${intlModel}/locale`,
};
const reducerName = {
  locale: 'locale',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: intlModel,
  state: initState,
  effects: {},
  reducers: {
    [reducerName.locale](state, {payload}) {
      console.log('intlModel.js reducers locale payload=', payload);
      const newState = {
        ...state,
        locale: payload,
        messages: messages[payload],
      };
      console.log('intlModel.js reducers locale newState=', newState);

      return newState;
    },
  },
};
