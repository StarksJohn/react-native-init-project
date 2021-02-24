import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

/**
 * 可动态监听 网络情况
 * @type {string}
 */
const netInfoModel = 'netInfoModel';
const initState = {
  /**
   * 外部 通过 const networkAvailable = useSelector(
   (state) => state.netInfoModel.networkAvailable,
   ); 引用此值
   */
  networkAvailable: false,
  networkInfo: undefined, //NetInfo.addEventListener方法的回调参数返回的state
};
export const effects = {
  networkInfo: `${netInfoModel}/networkInfo`,
};
export const action = {
  networkInfo: `${netInfoModel}/networkInfo`,
  networkAvailable: `${netInfoModel}/networkAvailable`,
};
const reducerName = {
  networkInfo: 'networkInfo',
  networkAvailable: 'networkAvailable',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: netInfoModel,
  state: initState,
  effects: {
    *[effects.networkInfo]({action, payload, callback}, {put, call, select}) {
      console.log(
        'netInfoModel.js effects networkInfo payload=',
        payload,
        ' action =',
        action,
      );

      if (action) {
        yield put({type: action, payload});
      }
      const networkAvailable =
        Platform.OS === 'android'
          ? !!payload.isInternetReachable
          : !!payload.isConnected;
      console.log(
        'netInfoModel.js effects networkInfo networkAvailable=',
        networkAvailable,
      );
      yield put({
        type: reducerName.networkAvailable,
        payload: networkAvailable,
      });
    },
  },
  reducers: {
    [reducerName.networkInfo](state, {payload}) {
      console.log('netInfoModel.js reducers networkInfo payload=', payload);
      return {
        ...state,
        networkInfo: payload,
      };
    },
    [reducerName.networkAvailable](state, {payload}) {
      console.log(
        'netInfoModel.js reducers networkAvailable payload=',
        payload,
      );
      return {
        ...state,
        networkAvailable: payload,
      };
    },
  },
  subscriptions: {
    //初始化
    initCache: ({dispatch, history}) => {
      console.log('netInfoModel.js initCache');
      NetInfo.addEventListener((state) => {
        console.log('netInfoModel.js listenNetwork state=', state);
        dispatch({
          type: effects.networkInfo,
          payload: state,
          action: reducerName.networkInfo,
        });
      });
    },
  },
};
