import React, { useEffect, useRef, useState, useMemo, memo, useCallback, useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { effects, _action } from '~dva/bannerModel/bannerModel'

export default () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line camelcase
  const { campaign_banner } = useSelector((state) => state.bannerModel)

  // eslint-disable-next-line camelcase
  const fetch_campaign_banner = useCallback(
    (payload) => {
      console.log('useBannerModel.js fetch_campaign_banner payload=', payload)

      return dispatch({
        type: effects.awaitSaveSomeThing, // 对应bannerModel里的某个effect
        action: _action.campaign_banner, // 对应某个reducer
        payload,
        callback: (result) => {
          console.log('useBannerModel.jsx fetch_campaign_banner callback=', result)
        }
      })
    },
    [dispatch]
  )

  useEffect(() => {
    console.log('useBannerModel.js useEffect campaign_banner=', campaign_banner)
    // eslint-disable-next-line camelcase
  }, [campaign_banner])

  return { fetch_campaign_banner, campaign_banner }
}
