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
  },

  async login () {
    console.log('api.js login ')
    const [err, data] = await tool.to(post(Urls.login, {
      iv: 'YQBPAYl0Ghm2ogLsd16Wvg==',
      rawData: JSON.stringify({
        nickName: 'Stark',
        gender: 1,
        language: 'zh_CN',
        city: 'Santa Monica',
        province: 'California',
        country: 'US',
        avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8mVy14cXUbXbaKcTrQMVDje8N1ibeYPw7LgVvOgiauhIYLln6ZpuXHBlCvSzWibdqo8UYwUlS2iaFOQ/132'
      }),
      encryptedData: 'g8Ki/a/uLaK/SziU8NdOITdzLLcIpmT9HxC0W68iLz9NNBTR/L+Z3V4CsjaAM8MTs7xaYXj//w/JGgheVphN+7msz93+mbKT8UV//ms0DGsgGKSKvdULVOlfftWGTxgnUdZ5XWvyOQ+PQK2ouXonO4DBU8+q/MEiQHdYdbYDKU7xJj+kFbQaxl5P+767QIfCpSbBmwjSFbJKL1ZN5AJX8P4DkaE52j4GTh8aWViN88SQUEKPE7wF5mCREWcTQpXyZZZo8aWG6wkHS8BHxoyAosS0GsYDmK6ENS4oME8Yw37uKV2GWyBdbhsNEN+wgkVhyY7fq2sxXLaFSonf5Y7SvpHjHg13/fYo5t8t65CccQL9UyLWW6Jh8xz8N8+pam39AHq7Fv2svan0zXBIkPekPQ3wohIxy+ImpgGL5zz4v+KGnpmleJsfrZXdf1GUyFeY',
      signature: '37022f3e56b22101ff4344a6d1fbb5ade28270a9',
      code: '031mLoll2q2Tw74RuDkl28X3u52mLolU'
    }))
  }
}
