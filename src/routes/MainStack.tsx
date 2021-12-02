// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { CustomNavigationBar } from '~components'
import MainTabNavigator from './MainTabNavigator'
import { DetailsPage, WelcomePage } from '~pages'
import { appStyle, asyncStorage } from 'react-native-common-tools'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNetInfoModel } from '~useHooks'
import { constant } from '~constant'
import { routes } from '~routes'
import { tool } from 'starkfrontendtools'

const Stack = createStackNavigator()

export interface Props {
}
const MainStack :React.FC<Props> = (Props) => {
  const { colors } = useTheme()
  appStyle.safeAreaInsets = useSafeAreaInsets()
  console.log('MainStack.js safeAreaInsets =', appStyle.safeAreaInsets)
  const [initialRouteName, setInitialRouteName] = useState(null)

  useEffect(() => {
    console.log('MainStack.js componentDidMount')
    const getInitialRouteName = async () => {
      const [errInitialRouteName, dataInitialRouteName] = await tool.to(
        asyncStorage.getItem(constant.initialRouteName)
      )
      console.log(
        'MainStack.js componentDidMount dataInitialRouteName=',
        dataInitialRouteName,
        ' errInitialRouteName=',
        errInitialRouteName
      )
      // 保证 WelcomePage 只显示一次
      if (dataInitialRouteName) {
        console.log('MainStack.js setInitialRouteName routes.MainTabNavigator.routeName')
        // @ts-ignore
        setInitialRouteName(routes.MainTabNavigator.routeName)
      } else {
        // @ts-ignore
        setInitialRouteName(routes.WelcomePage.routeName)
      }
    }
    getInitialRouteName().then()
    return () => {
      console.log('MainStack componentWillUnmount')
    }
  }, [])

  useNetInfoModel()
  return !initialRouteName
  // eslint-disable-next-line multiline-ternary
    ? (
    // 加载各种启动时需要的缓存时 ,先显示全屏菊花
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ffffff'
      }}
    >
      <ActivityIndicator size='large' />
    </View>
      ) : (
    <Stack.Navigator
        // @ts-ignore
        initialRouteName={initialRouteName}
      // 通用的导航栏的样式,可根据暗黑模式改变背景色和title颜色 https://www.jianshu.com/p/a2582f8b16fd
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerBackTitleVisible: false
        // headerLeft: () => (
        //   //自定义左上角返回按钮
        //   <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" />
        // ),
      }}
    >
      {/* 所有 Stack.Screen 共用 Stack.Navigator里的同一个 导航栏 */}
      <Stack.Screen
        // 因为在页面里使用 import { routes } from '~routes'; 拿到的 routes是 undefined,故把 routes 注入到 initialParams里,在页面里就可以通过 const { routes } =
        // props.route.params; 拿到 routes
        initialParams={{ routes }}
        name={routes.WelcomePage.routeName}
        component={WelcomePage}
        options={{
          headerTitle: routes.WelcomePage.headerTitle,
          // @ts-ignore
          // eslint-disable-next-line react/display-name
          header: (props:StackHeaderProps) => <CustomNavigationBar {...props} />,
          headerShown: true
        }}
      />
      <Stack.Screen name={routes.MainTabNavigator.routeName} component={MainTabNavigator} />
      <Stack.Screen
        name={routes.DetailsPage.routeName}
        component={DetailsPage}
        // 因为在页面里使用 import { routes } from '~routes'; 拿到的 routes是 undefined,故把 routes 注入到 initialParams里,在页面里就可以通过 const { routes } =
        // props.route.params; 拿到 routes
        initialParams={{ routes }}
        options={{
          headerTitle: routes.DetailsPage.headerTitle,
          // header: (props) => <CustomNavigationBar {...props} />,
          headerShown: true
        }}
      />
    </Stack.Navigator>
      )
}

export default MainStack
