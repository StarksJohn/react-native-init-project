/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState, useReducer} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import MainTabNavigator from './routes/MainTabNavigator';
import {ThemeContext} from './context/themeContext';
import {Provider as StoreProvider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './routes/routes';
import constant from './constants/constant';
import CustomNavigationBar from './components/CustomNavigationBar';
import WelcomePage from './pages/WelcomePage';
import {appStyle, tool, asyncStorage} from 'RNProjectTools';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainiStack from './routes/MainStack';
import dva from './dva/dva';
import models from './dva/models/models';

// const Drawer = createDrawerNavigator();

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  enableLog: false,
});
const store = dvaApp.getStore();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState(null);

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
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: '#333333',
      accent: appStyle.appThemeColor,
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  console.log('App.js theme=', theme);

  // 切换主题模块,不会因为当前控件重绘而重新创建
  const themeContext = React.useMemo(
    () => ({
      //切换 正常 | 暗黑 模式 Toggle normal | dark mode
      toggleTheme: () => {
        console.log('App.js toggleTheme 切换了主题');
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    console.log('App.js componentDidMount');
    const get_initialRouteName = async () => {
      const [err_initialRouteName, data_initialRouteName] = await tool.to(
        asyncStorage.getItem(constant.initialRouteName),
      );
      console.log(
        'App.js componentDidMount data_initialRouteName=',
        data_initialRouteName,
        ' err_initialRouteName=',
        err_initialRouteName,
      );
      if (data_initialRouteName) {
        console.log(
          'App.js setInitialRouteName routes.MainTabNavigator.routeName',
        );
        setInitialRouteName(routes.MainTabNavigator.routeName);
      } else {
        setInitialRouteName(routes.WelcomePage.routeName);
      }
    };
    get_initialRouteName().then();
  }, []);

  return !initialRouteName ? (
    // 加载各种启动时需要的缓存时 ,先显示全屏菊花
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        {/*https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
          Context Provider should be imported also at the entry point, as we want it to wrap the whole app, for the theme values to be accessible at
           every component that we have.
          上下文提供者也应该在入口点导入，因为我们希望它包装整个应用程序，以便在我们拥有的每个组件上都可以访问主题值。
          Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application 上下文被连接到我们的主要组件的本地状态中，因此它的值可以在整个应用程序中传播
          eg: 在 DrawerContent.js 可以 调 toggleTheme 方法: const { toggleTheme } = React.useContext(ThemeContext);
          */}
        <ThemeContext.Provider value={themeContext}>
          <NavigationContainer theme={theme}>
            <MainiStack initialRouteName={initialRouteName} />
          </NavigationContainer>
        </ThemeContext.Provider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
