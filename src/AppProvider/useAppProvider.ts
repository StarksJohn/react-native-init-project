import React, {
  useEffect,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import { dvaState } from '~dva'
import { appStyle, useIsDarkMode } from 'react-native-common-tools'
import { useThemeContextModel } from '~useHooks'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

export default () => {
  const { isDarkTheme, isCompleteInitCache } = useSelector((state:dvaState) => state.ThemeContextModel)
  console.log('useAppProvider.ts ThemeContextModel.isDarkTheme=', isDarkTheme)
  const [appProviderIsDarkTheme, setAppProviderIsDarkTheme] = useState(isDarkTheme)
  // 判断当前系统是否是暗黑模式 Determine whether the current operating system is in dark mode
  const isDarkMode = useIsDarkMode()
  console.log('useAppProvider.tsx isDarkMode=', isDarkMode)
  // 发redux改变主题颜色
  const { toggleTheme } = useThemeContextModel()

  /**
   * 为了app启动时从 ThemeContextModel.isDarkTheme 的缓存值初始化 appProviderIsDarkTheme
   */
  useEffect(() => {
    console.log('useAppProvider.js isDarkTheme has changed to =', isDarkTheme, ' appProviderIsDarkTheme=', appProviderIsDarkTheme)
    if (isDarkTheme === undefined) { // app第一次启动后未设置过 isDarkTheme 的值时,根据系统是否是暗黑模式设置此值
      console.log('useAppProvider.tsx useEffect isDarkTheme has changed to undefined isCompleteInitCache=', isCompleteInitCache)
      isCompleteInitCache && toggleTheme({ isDarkTheme: isDarkMode })
    } else if (isDarkTheme !== appProviderIsDarkTheme) {
      console.log('useAppProvider.js useEffect setAppProviderIsDarkTheme =', isDarkTheme)
      setAppProviderIsDarkTheme(isDarkTheme)
    }
  }, [isDarkTheme, appProviderIsDarkTheme, isDarkMode, isCompleteInitCache])

  // 定义在 useThemeContext.ts 里声明的 _toggleTheme 方法
  const themeContext = React.useMemo(
    () => ({
      // 切换 正常 | 暗黑 模式 Toggle normal | dark mode
      _toggleTheme: () => {
        console.log('useAppProvider.js _toggleTheme 切换了主题 appProviderIsDarkTheme=', appProviderIsDarkTheme)
        toggleTheme({ isDarkTheme: !appProviderIsDarkTheme })
        // setAppProviderIsDarkTheme((appProviderIsDarkTheme) => !appProviderIsDarkTheme)
      }
    }),
    [toggleTheme, appProviderIsDarkTheme]
  )

  /**
   * https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
   * Combining theme objects, to apply theming for an application using React Native Paper and React Navigation at the same time
   * After combining the themes, we will be able to control theming in both libraries from a single source
   */
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      accent: appStyle.appThemeColor,
      primary: appStyle.pageBackgroundColor,
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: '#333333',
      accent: appStyle.appThemeColor,
      text: '#ffffff'
    }
  }
  const theme = appProviderIsDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return { appProviderIsDarkTheme, theme, isDarkTheme, themeContext }
}
