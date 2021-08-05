import { baseModel, tool } from 'react-native-common-tools'
import { campaignBanner } from '@api'

/**
 * 健康走页面 banner
 * @type {string}
 */
const bannerModel = 'bannerModel'
const initState = {
  campaign_banner: []
}
/**
 * 由外部控件 dispatch 触发,effects里的值 对应 dispatch里的 type,到 当前Model的 effects 里响应
 * @type {{awaitSaveSomeThing: string, saveSomeThing: string}}
 */
export const effects = {
  saveSomeThing: `bannerModel/${baseModel.baseEffects.saveSomeThing}`, // 每个model默认的同步的直接改变此 model 的某个 state 的 effect
  awaitSaveSomeThing: `bannerModel/${baseModel.baseEffects.awaitSaveSomeThing}` // 异步获取数据改变 某个 state
}
/**
 * 触发当前Model的 reducer
 * @type {{awaitSaveSomeThing: string, campaign_banner: string, saveSomeThing: string}}
 */
export const _action = {
  ...baseModel.baseAction,
  campaign_banner: 'campaign_banner'
}

const awaitSaveSomeThing = ({ actions }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    switch (actions) {
      case _action.campaign_banner:
        {
          console.log('bannerModel.js awaitSaveSomeThing 开始异步获取 camcampaign_bannerpaign_banner 的 值')
          const [err, campaign_banner] = await tool.to(campaignBanner({ campaign_type: 'step' }))
          console.log('bannerModel campaign_banner =', campaign_banner)
          if (campaign_banner && campaign_banner instanceof Array) {
            resolve(campaign_banner)
          }
        }
        break
    }
  })
}

/**
 * https://dvajs.com/api/#model
 * 被注入到 dvaApp.ts 里
 */
export default {
  namespace: bannerModel,
  state: initState,
  attributesToBeCached: [_action.campaign_banner], // 被缓存的数据的key
  effects: {
    * [baseModel.baseEffects.awaitSaveSomeThing] ({ action, payload, callback }, { put, call, select }) {
      // 每个model通用的异步获取数据 && 更新 某个reducer
      console.log('bannerModel effects awaitSaveSomeThing payload=', payload, ' action =', action)
      const state = yield select((state) => state) // 这里就获取到了当前state
      console.log('bannerModel effects awaitSaveSomeThing 全局state=', state)

      // 处理不同的当前model相关异步请求
      const [err, data] = yield tool.to(awaitSaveSomeThing({ actions: action }))
      console.log('bannerModel.js awaitSaveSomeThing data=', data)

      // 更新 当前model的 initState
      const newPayload = {
        [`${action}`]: data
      }
      console.log('bannerModel awaitSaveSomeThing 更新 当前model的 initState  newPayload=', newPayload)
      yield put({
        type: baseModel.baseEffects.saveSomeThing,
        action,
        payload: newPayload
      })
    }
  },
  reducers: {}
}
