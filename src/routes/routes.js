import React from 'react'
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import { routes } from 'react-native-common-tools'

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
    headerTitle: '我的',
    rightComp: (
      <Button
        color='red'
        title='右按钮'
        onPress={(e) => {
          console.log('routes.js MinePage rightComp onPress e=', e)
        }}
      />
    )
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
