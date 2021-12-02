/**
 * 声明一个完整的 dvaModel 的例子
 * Declare a complete dvaModel example
 */
import { baseModel, modelProps } from 'react-cacheable-dva'

const userModel = 'userModel'
const initState = {
  access_token: '',
  member_id: ''
}

/**
 * 由外部控件 dispatch 触发,effects里的值 对应 外部控件dispatch里传的 type,到 当前Model的 effects 里响应
 * Triggered by the dispatch of the external control, the value in effects corresponds to the type passed in the dispatch of the external control, and responds to the effects of the current Model
 * @type {{awaitSaveSomeThing: string, saveSomeThing: string}}
 */
const effects = {
  /**
   * The current model synchronously directly changes the effect of an attribute in the model's initState. This effect can only be dispatched by an external control, and the receiving place is in modelTools.js
   * 当前model同步的直接改变此 model 的initState里的某个属性 的 effect,此effect只能由外部某个控件dispatch,接收的地方在 modelTools.js 里
   */
  saveSomeThing: `userModel/${baseModel.baseEffects.saveSomeThing}`,
  /**
   * The current model asynchronously obtains api data && change state
   * 当前model异步获取api数据&&改变state
   */
  awaitSaveSomeThing: `userModel/${baseModel.baseEffects.awaitSaveSomeThing}` //
}

/**
 * 触发当前Model的 reducer
 * Trigger the reducer of the current Model
 * @type {{awaitSaveSomeThing: string, campaign_banner: string, saveSomeThing: string}}
 */
const action = {
  ...baseModel.baseAction,
  /**
   * Change the action of access_token in initState
   * 改变 initState里的 access_token 的 action
   */
  access_token: 'access_token'
}

/**
 * 用于异步获取数据 && 更新当前model 的initState, 由 dvaDispatch({
        type: userModel.effects.awaitSaveSomeThing,
        action: userModel.action.access_token,
        payload: {},
        callback: () => {
        }
      }) 触发,在 modelTools.ts 里的  [baseModel.baseEffects.awaitSaveSomeThing] 这个effects里调用
 * @param actions
 */
// @ts-ignore
const awaitSaveSomeThing = async ({ actions }) => {
  switch (actions) {
    // eslint-disable-next-line no-lone-blocks
    case action.access_token:
      {
        // const [err, data] = await tool.to(api.access_token({}))
        // console.log('TimeLimitPanel time_limit res=', data)
        // if (data && !err) {
        //   return Promise.resolve(data)
        // }
      }
      break
  }
}

export interface userModeProps extends modelProps.modelProps {
  // eslint-disable-next-line camelcase
  access_token: string;
}

/**
 * https://dvajs.com/api/#model
 被注入到你自己项目的 dva/index.ts的 initDva方法里
 Is injected into the initDva method of dva/index.ts of your own project
 */
export default {
  namespace: userModel,
  state: initState,
  /**
   * The key of the data that the current model needs to be cached
   * 当前model需要被缓存的数据的key
   */
  attributesToBeCached: [action.access_token],
  effects,
  reducers: {},
  action,
  awaitSaveSomeThing
}
