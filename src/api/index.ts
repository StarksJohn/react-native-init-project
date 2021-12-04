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
const headers = getToken()

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

  const [err, data] = await tool.to(get({ url: Urls.campaign_banner, params: payload, headers }))

  console.log('api.ts campaign_banner data=', data, ' err=', err)
  if (data) {
    return Promise.resolve(data)
  } else {
    return Promise.reject(err)
  }
}

export const login = async () => {
  // @ts-ignore
  const [err, data] = await tool.to(post({
    url: Urls.login,
    params: {
    // 模拟的数据从 体脂称小程序项目的 api.js 的 login 方法里获取,注释调 那个方法的 request 部分
      code: '021jfv00008gTM1qTl3000YWBl0jfv0M',
      encryptedData: 'bvCz1CeemoOsz84FpRCFRWOyt3ehq4+m2km8PXocM5Y7loqLIShywbbT8V0b+mN9myTbaGQKW3jDID7um5pggkTaTBP1B4MTxofkL0Z4OLy/5g0Nvx2oq5fAQljOW/abxyutpCoIZa8v5xddHvHpWvo75oIHDpaFg+Rb0ET9amjUQLtjrPlkJtDBv9QdLPxgS6wOKs/vXR//qM781rh7rOymLcxkH+4GxYWpP7eA8CzTvOT3MQrUKG81BuBRcuSJk51/0ohTGSDZim8jwfT9HFgXnaWDsjhsqsYDDivmrFjlfD48Nov57eGO2MSqrySExrxZs97fZ+zxUX0iBKqpMBnx7u6Ud0p1vOAtVSmajmktZ3gj/I/nfPzJN4/7kmasW/62Vsodqs+J7NGWfNy5Og==',
      iv: 'GMrC2Qi9wnyJw/8CQRb/bA==',
      rawData: JSON.stringify({
        nickName: 'Stark',
        gender: 0,
        language: 'zh_CN',
        city: '',
        province: '',
        country: '',
        avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqR6PMrkLjvhwaYgQalaLRrGiaLUfJSzhL0RFmrow7vvbNcDm5nTFxRy8QFCnKbtVjcQj1HGJKWjlw/132'
      }),
      signature: '6f2564af33823e98dedb2b20a9f87c727963781f'
    },
    headers
  }))
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
