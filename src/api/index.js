import Urls from './Urls'
import { XHttp } from 'react-native-easy-app'
import { get, post } from './request'
import { tool } from 'react-native-common-tools'

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

    // return new Promise((resolve, reject) => {
    //   XHttp()
    //     .url(Urls.campaign_banner)
    //     .param(payload)
    //     .get(({ success, json, message, status, response }) => {
    //       console.log(
    //         'index.js campaign_banner success=',
    //         success,
    //         ' json=',
    //         json,
    //         ' message=',
    //         message,
    //         ' status=',
    //         status
    //       )
    //       if (success) {
    //         resolve(json)
    //       } else {
    //         // eslint-disable-next-line prefer-promise-reject-errors
    //         reject([])
    //       }
    //     })
    // })
  }
}
