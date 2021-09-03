import { EN, MOMENT_LOCALE } from 'react_intl/locale'
import messages from 'react_intl/messages/messages'
import { baseModel, modelProps } from 'react-native-common-tools'

const intlModel = 'intlModel'
const initState = {
  intlLocale: EN,
  locale: EN,
  messages: messages[EN],
  momentLocale: MOMENT_LOCALE,
  initialNow: Date.now(),
  setLocaleCompleted: false
}
const effects = {
  saveSomeThing: `intlModel/${baseModel.baseEffects.saveSomeThing}` // 每个model默认的同步的直接改变此 model 的某个 state 的 effect
}
const action = {
  ...baseModel.baseAction,
  locale: 'locale'
}

export interface intlModelProps extends modelProps{
  intlLocale: string,
  locale: string,
  messages: object,
  momentLocale: string,
  initialNow: Date,
  setLocaleCompleted: boolean
}

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: intlModel,
  state: initState,
  attributesToBeCached: [action.locale], // 被缓存的数据的key
  effects,
  action
}
