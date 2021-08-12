import axios from 'axios'
import { Platform } from 'react-native'
import { tool } from 'react-native-common-tools'

axios.defaults.timeout = 10000

// Request interceptor
// 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
// 如果存在，则统一在http请求的headers都加上token，这样后台根据token判断你的登录情况
// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
axios.interceptors.request.use(config => {
  const { userModel } = tool.getStore().getState()
  console.log('request.js userModel=', userModel)
  config.headers.Authorization = userModel.access_token // Add token to each request
  config.headers.platform = Platform.OS // 后台需要的参数
  config.headers.Origin = config.url
  config.headers['Content-Type'] = 'application/json;'// 除了上传文件时需要 multipart/form-data,其他 都是 application/json

  console.log('request.js interceptors.request config=', config)
  return config
}, error => {
  // Do something with request error
  console.log('request.js interceptors.request error=', error)
  return Promise.reject(error)
})

// 响应拦截器, 执行早于 checkStatus
axios.interceptors.response.use(response => {
  console.log('request.js interceptors.response.use response=', response)
  // 根据返回不同的状态码做不同的事情
  // 这里一定要和后台开发人员协商好统一的错误状态码
  if (response.data.code) {
    switch (response.data.code) {
      case 200:
        return response.data
      case 401:// 用户token失效
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('401')// 接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
      case 403:
        // token过期处理方法
        break
      default:
        // message.error(response.data.msg)
    }
  } else if (response.status !== 200) { // 接口请求失败，具体根据实际情况判断
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('request.js response.status !== 200')// 接口Promise返回错误状态
  } else {
    return response
  }
}, (err) => {
  if (err && axios.isCancel(err)) {
    // requestList.length = 0
    // store.dispatch('changeGlobalState', {loading: false})
    console.log('request.js throw axios.Cancel')
    throw new axios.Cancel('request.js cancel api')
  } else if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  return Promise.resolve(err)
})

// 处理请求返回的数据
const checkStatus = (response) => {
  return new Promise((resolve, reject) => {
    console.log('request.js checkStatus response=', response)
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      resolve(response.data)
    } else { // 网络异常
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('response.status 网络异常')
    }
  })
}

const validateStatus = (status) => {
  console.log('request.js  validateStatus status=', status)

  // 只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
  return status >= 200 && status < 300
}

const get = (url, params = {}) => {
  console.log('request.js get url=', url)
  console.log('request.js get params=', params)

  return axios.get(url, {
    params: params,
    validateStatus: validateStatus
  }).then((res) => {
    return checkStatus(res)
  }).catch((error) => {
    console.log('request.js get error=', error)
    return Promise.reject(error)
  })
}

const post = (url, params = {}) => {
  console.log('request.js post url=', url)
  console.log('request.js post params=', params)
  return axios
    .post(url, params,
      {
      // params, 不要加这个参数,否则 Post 请求的 url里 会被加上 很长的 参数
        validateStatus: validateStatus
      }
    )
    .then((res) => {
      return checkStatus(res)
    })
    .catch((error) => {
      console.log('request.js post error=', error)
      return Promise.reject(error)
    })
}

/**
 * 多接口并发请求（避免 await 导致多余等待）
 * https://hentaimiao.me/frontEnd/axios/axios01.html#%E5%8D%95%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%A4%9A%E6%8E%A5%E5%8F%A3%E5%B9%B6%E5%8F%91%E8%AF%B7%E6%B1%82-await-%E5%AF%BC%E8%87%B4%E5%A4%9A%E4%BD%99%E7%AD%89%E5%BE%85
 * @param requests
 * @returns {Promise<unknown[]>}
 */
const asyncAll = (requests = []) => {
  // 使用 axios 的 all 方法
  return axios.all(requests).then(resultArr => {
    // 对结果做特殊化处理，此处是对返回接口 code 在一定范围内作信息弹框
    for (const result of resultArr) {
      const code = result.code
      if (code > 220 || code < 200) {
        // proxyUtil.alertMessage(result.msg)
      }
    }
    //  返回每个方法返回的接口数据
    return resultArr
  }).catch(error => {
  })
}

export {
  get, asyncAll, post
}
