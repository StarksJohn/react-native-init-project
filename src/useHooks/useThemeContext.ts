import React, { useCallback } from 'react'
import { ThemeContext } from '~context'

/**
 * Toggle dark mode
 * app里切换主题的唯一方法
 * const { toggleTheme } = useThemeContext();
 * toggleTheme()
 * @returns {{toggleTheme: ((function(): void)|*)}}
 */
export default () => {
  // @ts-ignore
  const { _toggleTheme } = React.useContext(ThemeContext)

  const toggleTheme = useCallback(() => {
    console.log('useThemeContext.js _toggleTheme=', _toggleTheme)

    _toggleTheme()// 此方法在 useAppProvider.ts 里定义
  }, [_toggleTheme])

  return { toggleTheme }
}
