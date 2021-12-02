// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import { Platform } from 'react-native'
import { netInfoModel } from '~dva'

export default () => {
  const dispatch = useDispatch()
  const { isConnected, isInternetReachable } = useNetInfo()
  const [networkAvailable, setNetworkAvailable] = useState(true)
  useEffect(() => {
    console.log('useNetInfoModel.js useEffect isConnected=', isConnected, ' isInternetReachable=', isInternetReachable)
    const _networkAvailable = Platform.OS === 'android' ? !!isInternetReachable : !!isConnected
    console.log('useNetInfoModel.js useEffect _networkAvailable=', _networkAvailable)
    setNetworkAvailable(_networkAvailable)
  }, [isConnected, isInternetReachable])

  // eslint-disable-next-line camelcase
  const dispatch_networkAvailable = useCallback(
    (payload) => {
      console.log('useNetInfoModel.js dispatch_networkAvailable payload=', payload)

      return dispatch({
        type: netInfoModel.effects.saveSomeThing, //
        action: netInfoModel.action.networkAvailable, // 对应某个reducer
        payload: { networkAvailable },
        callback: (result: any) => {
          console.log('useNetInfoModel.js  dispatch_networkAvailable callback=', result)
        }
      })
    },
    [dispatch, networkAvailable]
  )

  useEffect(() => {
    console.log('useNetInfoModel.js useEffect networkAvailable=', networkAvailable)
    // @ts-ignore
    dispatch_networkAvailable()
    // eslint-disable-next-line camelcase
  }, [dispatch_networkAvailable, networkAvailable])

  return { dispatch_networkAvailable }
}
