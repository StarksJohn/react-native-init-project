/*
 * http://dev-active.cxaone.cn/backend/site/doc#/
 * */
import AppConfig from 'react-native-config'

// 保存环境变量
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // development | production
// console.log('__DEV__=', __DEV__) // true | false  废弃

const testHost = AppConfig.HTTPS + AppConfig.TEST_HOST // 1.1.0 version test environment
const onlineHost = AppConfig.HTTPS + AppConfig.ONLINE_HOST
console.log('testHost=', testHost)
console.log('onlineHost=', onlineHost)

// The back-end interface version number has nothing to do with the app version number
const version = 'v1'

const host = process.env.NODE_ENV === 'development' ? testHost : onlineHost

export default {
  host,
  http: AppConfig.HTTP,
  https: AppConfig.HTTPS,
  testHost,
  version,
  onlineHost,
  campaign_banner: `${host}/api/${version}/campaign/banner`
}
