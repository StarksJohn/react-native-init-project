import { get, post } from 'axios-tools'
import Urls from './Urls'
import { userModel } from '~dva'
import { tool } from 'starkfrontendtools'
import { dvaTool } from 'react-cacheable-dva'

const getToken = () => {
  const { userModel } = dvaTool.getStore().getState()
  console.log('api getToken userModel=', userModel)
  return { Authorization: userModel.access_token }
}

export const campaignBanner = async (payload: {
  // eslint-disable-next-line camelcase
  campaign_type: string
} | undefined) => {
  console.log('api.ts campaign_banner payload=', payload)
  payload = {
    ...{
      campaign_type: payload?.campaign_type || 'weight' // weight, step
    },
    ...payload
  }

  const [err, data] = await tool.to(get(Urls.campaign_banner, payload, { ...getToken() }))

  console.log('api.ts campaign_banner data=', data, ' err=', err)
  if (data) {
    return Promise.resolve(data)
  } else {
    return Promise.reject(err)
  }
}

export const login = async () => {
  const [err, data] = await tool.to(post(Urls.login, {
    // 模拟的数据从 体脂称小程序项目的 api.js 的 login 方法里获取,注释调 那个方法的 request 部分
    code: '091aey0w3zuAyX2E8r0w3F8C5I2aey07',
    encryptedData: '2rwIHu8VreZJRwUOAnOKUg/y2aLl4f1+aFP2Rdl2XUbaJm/xkBfNdFf8XtV+4MpNml+fzll/wOVSu+qhT6EFANd2x+CmoxUZEpqE6GxXvY56fTaQQ0ThcG3jaSMrVUeqJ/9Lso9xGJwYr0dxGCLY9a+jM3as2aWwrLW3NP2PchsX44kA3pTaVKZ12AqJS2cmX119IpHQo5RDOAgmlS7icueFpHoe/fqCFC2bhefIr9F8+avTLORBTcp+U4nmhtYNabJ19+XRG2uDejFmrskEi5ACa/gfQcmBOuNmAOQd0PuWGlOjDJCraZAtcfrGi9B/n6WxXw8RtLbsVCaw7hbIPBtfpEuM4ORrHzMAPoxorjlA1tiQcoOVnpYT0Qb3s7q5K5jf1UzS5lim4s6AbaiH4A==',
    iv: 'Ms2sTKG/cjW8xrJJRbYlTw==',
    rawData: JSON.stringify({
      nickName: 'Stark',
      gender: 0,
      language: 'zh_CN',
      city: '',
      province: '',
      country: '',
      avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqR6PMrkLjvhwaYgQalaLRrGiaLUfJSzhL0RFmrow7vvbNcDm5nTFxRy8QFCnKbtVjcQj1HGJKWjlw/132'
    }),
    signature: '574e21a907fdef73411f97628f69c3f409292d42'
  }, { ...getToken() }))
  console.log('api.js login data=', data, ' err=', err)
  if (data) { // 登录成功
    dvaTool.dispatchAnyWhere({
      type: userModel.effects.saveSomeThing,
      action: userModel.action.access_token,
      payload: {
        access_token: data.access_token
      },
      callback: (result: any) => {
        console.log('modelTools.js saveSomeThing callback=', result)
      }
    })
  }
}

/**
 * import {  } from '~api'
 */
module.exports = {
  campaignBanner, login
}
