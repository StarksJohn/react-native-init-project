import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Platform } from 'react-native'
import { tool } from 'react-native-common-tools'
import qs from 'qs'
import cleanDeep from 'clean-deep'

/**
 * Because of access_token, this module can only be placed in the main project
 */

const checkStatus = (response: AxiosResponse<any>) => {
  return new Promise((resolve, reject) => {
    console.log('request.ts checkStatus response=', response)
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      resolve(response.data)
    } else { // 网络异常
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('request.ts checkStatus response.status network anomaly')
    }
  })
}

const validateStatus = (status: number) => {
  console.log('request.ts  validateStatus status=', status)

  // Only the return code of 2xx will be returned normally (resolve), and all non-2xx will be treated as exceptions (reject)
  return status >= 200 && status < 300
}

/**
 * Request interceptor
 * @param config
 */
const handleRequestConfig = (config: AxiosRequestConfig) => {
  console.log('request.ts handleRequestConfig config=', config)
  // Recursively delete empty objects, empty arrays, empty strings, null and value values from the object. Do not change the original data。
  const Config = cleanDeep(config, {
    emptyArrays: false,
    emptyObjects: false
  })
  if (Config.method === 'get') {
    Config.paramsSerializer = params => {
      console.log('request.ts paramsSerializer params=', params)
      // A querystring parsing and stringifying library with some added security.
      const qsStr = qs.stringify(params, {
        arrayFormat: 'repeat'
      })
      console.log('request.ts paramsSerializer qsStr=', qsStr)
      return qsStr
    }
  }
  const { userModel } = tool.getStore().getState()
  console.log('request.ts handleRequestConfig userModel=', userModel)
  Config.headers.Authorization = userModel.access_token // Add token to each request
  Config.headers.platform = Platform.OS
  Config.headers.Origin = Config.url
  Config.headers['Content-Type'] = 'application/json;'// Except for 'multipart/form-data' when uploading files, all others are 'application/json'

  console.log('request.ts interceptors.request config=', Config)
  return Config
}

/**
 * Response interceptor
 * Execution earlier than checkStatus method
 * @param response
 */
const handleResponseSuccess = (response: { data: { code: any }, status: number }) => {
  console.log('request.ts handleResponseSuccess response=', response)
  if (response.data.code) {
    switch (response.data.code) {
      case 200:
        return response.data
      case 401:// User token is invalid
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('401')
      case 403:
        // How to deal with token expiration
        break
      default:
        // message.error(response.data.msg)
    }
  } else if (response.status !== 200) { // api request failed, based on actual situation
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('request.ts response.status !== 200')// 接口Promise返回错误状态
  } else {
    return response
  }
}

const handleResponseFail = (err: { response: { status: any }; message: string }) => {
  if (err && axios.isCancel(err)) {
    // requestList.length = 0
    // store.dispatch('changeGlobalState', {loading: false})
    console.log('request.ts throw axios.Cancel')
    throw new axios.Cancel('request.ts cancel api')
  } else if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = 'Bad request'
        break
      case 401:
        err.message = 'Unauthorized, please log in again'
        break
      case 403:
        err.message = 'access denied'
        break
      case 404:
        err.message = 'Request error, the resource was not found'
        break
      case 405:
        err.message = 'Request method not allowed'
        break
      case 408:
        err.message = 'Request timed out'
        break
      case 500:
        err.message = 'Server-side error'
        break
      case 501:
        err.message = 'Network not implemented'
        break
      case 502:
        err.message = 'Network Error'
        break
      case 503:
        err.message = 'service is not available'
        break
      case 504:
        err.message = 'network timeout'
        break
      case 505:
        err.message = 'http version does not support the request'
        break
      default:
        err.message = `connection error : ${err.response.status}`
    }
  } else {
    err.message = 'Failed to connect to server'
  }
  return Promise.resolve(err)
}

class Api {
  instance: AxiosInstance
  constructor (baseConfig?: AxiosRequestConfig) {
    // @ts-ignore
    if (!this.instance) {
      console.log('request.ts constructor baseConfig=', baseConfig)
      this.instance = axios.create({
        baseURL: '',
        timeout: 10000,
        ...baseConfig
      })
      // Request interceptor
      this.instance.interceptors.request.use(handleRequestConfig, error => {
        // Do something with request error
        console.log('request.ts interceptors.request error=', error)
        return Promise.reject(error)
      })
      // Response interceptor
      // @ts-ignore
      this.instance.interceptors.response.use(handleResponseSuccess, handleResponseFail)
    }
  }
}
export const api: AxiosInstance = new Api().instance

const get = (url: string, params = {}) => {
  console.log('request.ts get url=', url)
  console.log('request.ts get params=', params)

  return api.get(url, {
    params: params,
    validateStatus: validateStatus
  }).then((res) => {
    return checkStatus(res)
  }).catch((error) => {
    console.log('request.ts get error=', error)
    return Promise.reject(error)
  })
}

const post = (url:string, params = {}) => {
  console.log('request.ts post url=', url)
  console.log('request.ts post params=', params)
  return api
    .post(url, params,
      {
        // params, Do not add this parameter, otherwise a very long parameter will be added to the url of the Post request
        validateStatus: validateStatus
      }
    )
    .then((res) => {
      return checkStatus(res)
    })
    .catch((error) => {
      console.log('request.ts post error=', error)
      return Promise.reject(error)
    })
}

/**
 * Multi-interface concurrent requests (to avoid redundant waiting caused by await)
 * https://hentaimiao.me/frontEnd/axios/axios01.html#%E5%8D%95%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%A4%9A%E6%8E%A5%E5%8F%A3%E5%B9%B6%E5%8F%91%E8%AF%B7%E6%B1%82-await-%E5%AF%BC%E8%87%B4%E5%A4%9A%E4%BD%99%E7%AD%89%E5%BE%85
 * @param requests
 * @returns {Promise<unknown[]>}
 */
// const asyncAll = (requests = []) => {
//   return axios.all(requests).then(resultArr => {
//     for (const result of resultArr) {
//       const code = result.code
//       if (code > 220 || code < 200) {
//         // proxyUtil.alertMessage(result.msg)
//       }
//     }
//     return resultArr
//   }).catch(error => {
//   })
// }

export {
  get, post
}
