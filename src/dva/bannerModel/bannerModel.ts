import { baseModel, modelProps } from 'react-cacheable-dva'
import { campaignBanner } from '~api'
import { tool } from 'starkfrontendtools'

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
export const action = {
  ...baseModel.baseAction,
  campaign_banner: 'campaign_banner'
}

// @ts-ignore
const awaitSaveSomeThing = ({ actions }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    switch (actions) {
      case action.campaign_banner:
        {
          console.log('bannerModel.js awaitSaveSomeThing 开始异步获取 camcampaign_bannerpaign_banner 的 值')
          // eslint-disable-next-line camelcase,no-unused-vars
          const [err, campaign_banner] = await tool.to(campaignBanner({ campaign_type: 'step' }))
          console.log('bannerModel campaign_banner =', campaign_banner)
          // eslint-disable-next-line camelcase
          if (campaign_banner && campaign_banner instanceof Array) {
            resolve(campaign_banner)
          }
        }
        break
    }
  })
}

export interface bannerModelProps extends modelProps.modelProps{
  // eslint-disable-next-line camelcase
  campaign_banner:[],
}

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: bannerModel,
  state: initState,
  attributesToBeCached: [action.campaign_banner], // 被缓存的数据的key
  effects: {
    ...effects,
    ...{
      // @ts-ignore
      * [baseModel.baseEffects.awaitSaveSomeThing] ({ action, payload, callback }, { put, call, select }) {
        // 每个model通用的异步获取数据 && 更新 某个reducer
        console.log('bannerModel effects awaitSaveSomeThing payload=', payload, ' action =', action)
        // @ts-ignore
        const state = yield select((state) => state) // 这里就获取到了当前state
        console.log('bannerModel effects awaitSaveSomeThing 全局state=', state)

        // 处理不同的当前model相关异步请求
        // eslint-disable-next-line no-unused-vars
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
    }
  },
  action,
  reducers: {}
}
