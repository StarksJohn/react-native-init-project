import React from 'react'
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import { routes } from 'react-native-common-tools'
import { StackHeaderProps } from '@react-navigation/stack'
import { CustomNavigationBar } from 'components'
import { NavigationProp } from '@react-navigation/core'
import Animated from 'react-native-reanimated'

// export const setOptions=(navigation:NavigationProp,) => {
//   const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
// // 控制一级页面顶部公用的导航栏是否显示
//   setOptions({
//     // @ts-ignore
//     // eslint-disable-next-line react/display-name
//     header: (props:StackHeaderProps) => <CustomNavigationBar {...props} rightComp={rightComp} />,
//     headerTitle,
//       headerShown
// })
// }

export default {
  ...routes,
  MainStack: {
    routeName: 'MainStack'
  },
  HomePage: {
    routeName: 'HomePage',
    headerTitle: '首页'
  },
  MinePage: {
    routeName: 'MinePage',
    headerTitle: '我的'
    //     rightComp:(
    //     )
  },
  WelcomePage: {
    routeName: 'WelcomePage',
    headerTitle: '欢迎页'
  },
  DetailsPage: {
    routeName: 'DetailsPage',
    headerTitle: '详情页'
  },
  MainTabNavigator: {
    routeName: 'MainTabNavigator',
    headerTitle: ''
  },
  SecondStack: {
    routeName: 'SecondStack'
  }
}
