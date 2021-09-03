// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomePage, MinePage } from '~pages'
import routes from './routes'
import { CustomNavigationBar } from '~components'
import { useTheme } from '@react-navigation/native'
import { useAndroidBackHandler, RouteProps } from 'react-native-common-tools'
import { NavigationProp } from '@react-navigation/core'
import { StackHeaderProps } from '@react-navigation/stack'
import { Button } from 'react-native'

const Tab = createMaterialBottomTabNavigator()

export interface Props {
  navigation:NavigationProp<any>,
  scene:StackHeaderProps['scene'], // Used for page components
  route:RouteProps
}
 interface tabBarIconProps {
  focused: boolean
  color: string
}
const MainTabNavigator:React.FC<Props> = (Props) => {
  console.log('MainTabNavigator.js Props=', Props)
  const { navigation, route } = Props
  const { state } = route
  const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const { colors } = useTheme()// theme is passed to PaperProvider in AppProvider.tsx

  /**
   * 避免安卓用户在一级页面时按后退按键后直接退出app
   * Prevent Android users from directly exiting the app after pressing the back button on the first level page
   */
  useAndroidBackHandler({
    navigation
  })

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      // componentWillUnmount
      return () => {
        console.log('MainTabNavigator componentWillUnmount')
      }
    },
    []
  )

  /*
 componentDidUpdate
 Call back every time you switch the bottom tab
 */
  useEffect(() => {
    console.log('MainTabNavigator componentDidUpdate Props=', Props)
    let headerShown = false
    let headerTitle = ''
    // eslint-disable-next-line no-undef
    let rightComp:JSX.Element
    if (state && state.index === 1) {
      headerShown = true
    }
    if (state) {
      const routeName = state.routeNames[state.index]
      // @ts-ignore
      headerTitle = routes[routeName].headerTitle
      // @ts-ignore
      rightComp = routes[routeName].rightComp
      if (routeName === routes.MinePage.routeName) {
        rightComp = <Button
            color='red'
            title='Button'
            onPress={(e) => {
              console.log('routes.js MinePage rightComp onPress e=', e)
            }}
        />
      }
    }
    console.log('MainTabNavigator componentDidMount setOptions headerShown=', headerShown)
    // 控制一级页面顶部公用的导航栏是否显示,此方法在 具体的一级页面里 调用 无效
    setOptions({
      // @ts-ignore
      // eslint-disable-next-line react/display-name
      header: (props:StackHeaderProps) => <CustomNavigationBar {...props} rightComp={rightComp} />,
      headerTitle,
      headerShown
    })
  })
  const tabBarColor = colors.primary

  return (
    // https://reactnavigation.org/docs/material-bottom-tab-navigator/
    <Tab.Navigator
      initialRouteName={routes.HomePage.routeName}
      shifting={true} // 是否开启动效,也就是选中时 不显示text
        // @ts-ignore
      activeColor={colors.accent}
      inactiveColor={colors.text}
    >
      <Tab.Screen
        key={routes.HomePage.routeName}
        name={routes.HomePage.routeName}
        // 因为在页面里使用 import { routes } from '~routes'; 拿到的 routes是 undefined,故把 routes 注入到 initialParams里,在页面里就可以通过 const { routes } =
        // props.route.params; 拿到 routes
        initialParams={{ routes }}
        component={HomePage}
        options={{
          tabBarLabel: '首页',
          tabBarColor: tabBarColor,
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, focused }:tabBarIconProps) => {
            console.log('MainTabNavigator.js HomePage tabBarIcon focused=', focused)
            return <Icon name="ios-home" color={color} size={22} />
          }
        }}
      />
      <Tab.Screen
        key={routes.MinePage.routeName}
        name={routes.MinePage.routeName}
        // 因为在页面里使用 import { routes } from '~routes'; 拿到的 routes是 undefined,故把 routes 注入到 initialParams里,在页面里就可以通过 const { routes } =
        // props.route.params; 拿到 routes
        initialParams={{ routes }}
        component={MinePage}
        options={{
          tabBarLabel: '我的',
          tabBarColor: tabBarColor,
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color, focused }:tabBarIconProps) => <Icon name="ios-home" color={color} size={22} />
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
