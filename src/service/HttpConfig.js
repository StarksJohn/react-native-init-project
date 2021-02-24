import {XHttpConfig} from 'react-native-easy-app';
import NetInfo from '@react-native-community/netinfo';

const HttpConfig = function () {
  console.log('HttpConfig construct ');
  this.init();
};

HttpConfig.prototype.init = function () {
  console.log('HttpConfig init ');

  /**
   * 创建默认的 HTTP配置实例,全局可通过 import {HttpConfig} from 'react-native-easy-app';
      HttpConfig['PHP'] 找到这个实例
   */
  XHttpConfig('PHP')
    .initHttpLogOn(true) //是否打印http请求log
    //在 HttpRequest.js 里 调用, 为了每次请求前判断网络情况
    .initNetworkExceptionFunc(NetInfo, (msg, code) => {
      console.log(
        'HttpConfig.js networkExceptionFunc msg=',
        msg,
        ' code=',
        code,
      );
      return true;
    });
};

const singleton = function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new HttpConfig();
    }
    return instance;
  };
};

export default new singleton()();
