import { baseModel } from 'react-native-common-tools';
/**
 * 可动态监听 网络情况
 * @type {string}
 */
const netInfoModel = 'netInfoModel';
const initState = {
  networkAvailable: false,
  /**
   *   details:{
     *   bssid: null
         ipAddress: "192.168.10.29"
         isConnectionExpensive: false
         ssid: null
         subnet: "255.255.255.0"
   *  }
       isConnected: true
       isInternetReachable: null
       type: "wifi"
   */
  // networkInfo: undefined, //NetInfo.addEventListener方法的回调参数返回的state
};
const effects = {
  saveSomeThing: `netInfoModel/${baseModel.baseEffects.saveSomeThing}`, //每个model默认的同步的直接改变此 model 的某个 state 的 effect
};
const action = {
  ...baseModel.baseAction,
  networkAvailable: 'networkAvailable',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: netInfoModel,
  state: initState,
  action,
  effects,
};
