import Urls from './Urls'
import { get, post } from './request'
import { tool } from 'react-native-common-tools'
import userModel from '../dva/userModel.js'

/**
 * import { campaignBanner } from '@api'
 */
module.exports = {

  async campaignBanner (payload) {
    console.log('index.js campaign_banner payload=', payload)
    payload = {
      ...{
        campaign_type: payload?.campaign_type || 'weight' // weight, step
      },
      ...payload
    }

    const [err, data] = await tool.to(get(Urls.campaign_banner, payload))
    console.log('src/api/index.js campaign_banner data=', data, ' err=', err)
    if (data) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(err)
    }
  },

  async login () {
    const [err, data] = await tool.to(post(Urls.login, {
      code: '081u72100UYPcM1PNA100QOiyy1u721X',
      encryptedData: 'xcIzmj0ZZZSHfaI/qhRtk6sjBSvPiwkXslByvTdoagmt93Q4hrnNprror/XDZuIBxjFlbAfM66iq1rSxlXW0NxA7cJTcUxYkH/N27js35eXc8RKpPZmNS/hoZWxibkOjVG7HUw3Q+xKePutTvTHPbOeCiSAWlILH1P5hpoJe7j+IhuyyFzvmmGF1rZnUQBhxife+a1r0xS1eLh0jsYW2PJ5g68pGLNnnSuxg0HH41pkWfYL7TVH8pKqhmQAUju5ECXjN13uTrUeThr9R1opg4SQHWLT20EjxKn0H4bNIS+evE1nOMZeDcvzHHP/E0+NizOKuHJrGNAHvNE5RbqUL0sqJrGrK559QxfTwqjCCEIXfBTijwViZwjAKEaWairRlq/YE4QgndQmsl2Lmwn3PfQUjyf/Ez0DO5mMBnYFPsr78cIHZbE3CTvNd0ZvnQgCD',
      iv: 'zw8Qmip3NNuxEE1p6hFgvQ==',
      rawData: JSON.stringify({
        nickName: 'Stark',
        gender: 1,
        language: 'zh_CN',
        city: 'Santa Monica',
        province: 'California',
        country: 'US',
        avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8mVy14cXUbXbaKcTrQMVDje8N1ibeYPw7LgVvOgiauhIYLln6ZpuXHBlCvSzWibdqo8UYwUlS2iaFOQ/132'
      }),
      signature: '8982b7d0878439bf01abc34b8796d02f5ecd3200'
    }))
    console.log('api.js login data=', data, ' err=', err)
    if (data) { // 登录成功
      userModel.dispatchSaveSomeThing({
        action: userModel.action.access_token,
        payload: {
          access_token: data.access_token
        },
        callback: (result) => {
          console.log('modelTools.js saveSomeThing callback=', result)
        }
      })
    }
  }
}
