import { tool, baseModel } from 'react-native-common-tools'

const userModel = 'userModel'
const initState = {
  access_token: '',
  member_id: ''
}

/**
 * 由外部控件 dispatch 触发,effects里的值 对应 外部控件dispatch里传的 type,到 当前Model的 effects 里响应
 * @type {{awaitSaveSomeThing: string, saveSomeThing: string}}
 */
const effects = {
  saveSomeThing: `userModel/${baseModel.baseEffects.saveSomeThing}`, // 当前model同步的直接改变此 model 的initState里的某个属性 的 effect,此effect只能由外部某个控件dispatch,接收的地方在 modelTools.js 里
  awaitSaveSomeThing: `userModel/${baseModel.baseEffects.awaitSaveSomeThing}` // 当前model异步获取api数据&&改变state
}

/**
 * 触发当前Model的 reducer
 * @type {{awaitSaveSomeThing: string, campaign_banner: string, saveSomeThing: string}}
 */
const action = {
  ...baseModel.baseAction,
  access_token: 'access_token' // 改变 initState里的 access_token 的 action
}

const dispatchSaveSomeThing = ({ action, payload, callback }) => {
  tool.dispatchAnyWhere({
    type: effects.saveSomeThing,
    action,
    payload,
    callback: (result) => {
      console.log('userModel.js dispatchSaveSomeThing callback=', result)
      callback && callback(result)
    }
  })
}

/**
 * https://dvajs.com/api/#model
 被注入到 dvaApp.ts 里
 */
export default {
  namespace: userModel,
  state: initState,
  attributesToBeCached: [
    action.access_token
  ], // 当前model需要被缓存的数据的key
  effects,
  reducers: {},
  action,
  dispatchSaveSomeThing
}
