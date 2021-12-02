
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { ThemeContext } from '~context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Provider as PaperProvider
} from 'react-native-paper'
// import { NavigationContainer } from '~routes'
import NavigationContainer from '../routes/NavigationContainer'
import useAppProvider from './useAppProvider'

export interface Props {
}
/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
const AppProvider:React.FC<Props> = (Props) => {
  const { appProviderIsDarkTheme, theme, themeContext } = useAppProvider()

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
