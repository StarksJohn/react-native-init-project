import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {sendEvent} from 'RNProjectTools';
import constant from '../constants/constant';

export default {
  HomePage: {
    routeName: 'HomePage',
    headerTitle: '首页',
  },
  MinePage: {
    routeName: 'MinePage',
    headerTitle: '我的',
    rightComp: (
      <Button
        color="#fff"
        title="右按钮"
        onPress={(e) => {
          console.log('routes.js MinePage rightComp onPress e=', e);

          sendEvent(constant.event.MinePageRightBtClicks);
        }}
      />
    ),
  },
  WelcomePage: {
    routeName: 'WelcomePage',
    headerTitle: '欢迎页',
  },
  DetailsPage: {
    routeName: 'DetailsPage',
    headerTitle: '详情页',
  },
  MainTabNavigator: {
    routeName: 'MainTabNavigator',
    headerTitle: '',
  },
  navigate: (navigation, routeName, params) => {
    console.log('routes.js navigate routeName=', routeName, ' params=', params);
    navigation.navigate(routeName, params);
  },
  push: (navigation, routeName, params) => {
    console.log('routes.js push routeName=', routeName, ' params=', params);
    navigation.push(routeName, params);
  },
  goBack: (navigation) => {
    navigation.goBack();
  },
  reset: (navigation, routeName) => {
    navigation.reset({
      routes: [{name: routeName}],
    });
  },
};
