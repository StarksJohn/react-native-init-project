/*
 * http://dev-active.cxaone.cn/backend/site/doc#/
 * */
import AppConfig from 'react-native-config';

console.log('process.env.NODE_ENV=', process.env.NODE_ENV); //development | production
console.log('__DEV__=', __DEV__); //true | false

const testHost = AppConfig.HTTP + AppConfig.TEST_HOST; // 1.1.0 version test environment
const onlineHost = AppConfig.HTTPS + AppConfig.ONLINE_HOST;
console.log('testHost=', testHost);

// The back-end interface version number has nothing to do with the app version number
const version = 'v1';

const host = __DEV__ ? testHost : onlineHost;

export default {
  host,
  http: AppConfig.HTTP,
  https: AppConfig.HTTPS,
  testHost,
  version,
  onlineHost,
};
