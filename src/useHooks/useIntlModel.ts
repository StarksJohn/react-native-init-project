// eslint-disable-next-line no-unused-vars
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { locale } from '~react_intl'
import { intlModel } from '~dva'
const { CN, EN } = locale

export default () => {
  // const {locale, messages} = useSelector((state) => state.intlModel);
  const dispatch = useDispatch()

  const switchToCN = useCallback(
    (payload?:any) => {
      console.log('useIntlModel switchToCN payload=', payload)
      return dispatch({
        type: intlModel.effects.saveSomeThing,
        action: intlModel.action.locale,
        payload: { locale: CN },
        callback: (result: any) => {
          console.log('useIntlModel.js 切换为中文 locale callback=', result)
        }
      })
    },
    [dispatch]
  )

  const switchToEN = useCallback(
    (payload?:any) => {
      console.log('useIntlModel switchToEN payload=', payload)
      return dispatch({
        type: intlModel.effects.saveSomeThing,
        action: intlModel.action.locale,
        payload: { locale: EN },
        callback: (result: any) => {
          console.log('useIntlModel.js 切换为EN callback=', result)
        }
      })
    },
    [dispatch]
  )

  return { switchToCN, switchToEN }
}
