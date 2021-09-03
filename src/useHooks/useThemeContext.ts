import React, { useCallback } from 'react'
import { ThemeContext } from '~context'

/**
 * Toggle dark mode
 * const { toggleTheme } = useThemeContext();
 * @returns {{toggleTheme: ((function(): void)|*)}}
 */
export default () => {
  // @ts-ignore
  const { _toggleTheme } = React.useContext(ThemeContext)

  const toggleTheme = useCallback(() => {
    console.log('useThemeContext.js _toggleTheme=', _toggleTheme)

    _toggleTheme()
  }, [_toggleTheme])

  return { toggleTheme }
}
