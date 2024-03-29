
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeContext } from '~context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper'
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native'
import { appStyle } from 'react-native-common-tools'
import { NavigationContainer } from '~routes'
import { ThemeContextModel, dvaState } from '~dva'
// import { Theme } from '~style'

export interface Props {
}
/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
const AppProvider:React.FC<Props> = (Props, parentRef) => {
  const { isDarkTheme } = useSelector((state:dvaState) => state.ThemeContextModel)
  console.log('AppProvider.js ThemeContextModel.isDarkTheme=', isDarkTheme)
  // const { toggleTheme } = useThemeContext();不能用,否则报错

  const dispatch = useDispatch()
  const [appProviderIsDarkTheme, setAppProviderIsDarkTheme] = useState(isDarkTheme)

  const toggleTheme = useCallback(
    () => {
      console.log('AppProvider.js toggleTheme Start to change ThemeContextModel.isDarkTheme')

      return dispatch({
        type: ThemeContextModel.effects.saveSomeThing, // 对应bannerModel里的某个effect
        action: ThemeContextModel._action.isDarkTheme, // 对应某个reducer
        payload: {
          isDarkTheme: !appProviderIsDarkTheme
        },
        callback: (result: any) => {
          console.log('AppProvider.jsx toggleTheme callback=', result)
        }
      })
    },
    [appProviderIsDarkTheme, dispatch]
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

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      console.log('AppProvider componentDidMount')

      // componentWillUnmount
      return () => {
        console.log('AppProvider componentWillUnmount')
      }
    },
    []
  )

  /**
   * 为了app启动时从 ThemeContextModel.isDarkTheme 的缓存值初始化 appProviderIsDarkTheme
   */
  useEffect(() => {
    console.log('AppProvider.js isDarkTheme has changed to =', isDarkTheme, ' appProviderIsDarkTheme=', appProviderIsDarkTheme)
    if (isDarkTheme !== appProviderIsDarkTheme) {
      console.log('AppProvider.js useEffect setAppProviderIsDarkTheme =', isDarkTheme)
      setAppProviderIsDarkTheme(isDarkTheme)
    }
  }, [isDarkTheme, appProviderIsDarkTheme])

  // 切换主题模块,不会因为当前控件重绘而重新创建
  const themeContext = React.useMemo(
    () => ({
      // 切换 正常 | 暗黑 模式 Toggle normal | dark mode
      _toggleTheme: () => {
        console.log('AppProvider.js _toggleTheme 切换了主题')
        setAppProviderIsDarkTheme((appProviderIsDarkTheme) => !appProviderIsDarkTheme)
        toggleTheme()
      }
    }),
    [toggleTheme]
  )

  // render
  console.log('AppProvider.js render appProviderIsDarkTheme=', appProviderIsDarkTheme, ' theme=', theme)

  return (
    <PaperProvider theme={theme}>
      {/* https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
          Context Provider should be imported also at the entry point, as we want it to wrap the whole app, for the theme values to be accessible at
           every component that we have.
          上下文提供者也应该在入口点导入，因为我们希望它包装整个应用程序，以便在我们拥有的每个组件上都可以访问主题值。
          Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application 上下文被连接到我们的主要组件的本地状态中，因此它的值可以在整个应用程序中传播
          eg: 在 DrawerContent.tsx 可以 调 toggleTheme 方法: const { toggleTheme } = useThemeContext();
          */}
      {/* @ts-ignore */}
      <ThemeContext.Provider value={themeContext}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme} />
        </SafeAreaProvider>
      </ThemeContext.Provider>
    </PaperProvider>
  )
}

export default AppProvider
