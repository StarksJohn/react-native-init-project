import {
  useCallback
} from 'react'
import { useDvaDispatch } from 'react-cacheable-dva'
import { ThemeContextModel } from '~dva'

export default () => {
  const { dvaDispatch } = useDvaDispatch()

  // 改变主题颜色
  const toggleTheme = useCallback(
    (payload) => {
      console.log('useThemeContextModel.js toggleTheme payload=', payload)

      return dvaDispatch({
        type: ThemeContextModel.effects.saveSomeThing,
        action: ThemeContextModel.action.isDarkTheme, //
        payload: { isDarkTheme: payload.isDarkTheme },
        callback: (result: any) => {
          console.log(
            'useThemeContextModel.js  callback=',
            result
          )
        }
      })
    },
    [dvaDispatch]
  )

  return { toggleTheme }
}
