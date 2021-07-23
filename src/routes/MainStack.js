import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from '../pages/WelcomePage';
import CustomNavigationBar from '../components/CustomNavigationBar';
import MainTabNavigator from './MainTabNavigator';
import DetailsPage from '../pages/DetailsPage';
import { appStyle, asyncStorage, tool } from '@RNProjectTools';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNetInfoModel } from '@useHooks';
import { constant } from '@/constant';
import routes from './routes.js';

const Stack = createStackNavigator();

const MainStack = ({}) => {
  const { colors } = useTheme();
  appStyle.safeAreaInsets = useSafeAreaInsets();
  console.log('MainStack.js safeAreaInsets =', appStyle.safeAreaInsets);
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    console.log('MainStack.js componentDidMount');
    const get_initialRouteName = async () => {
      const [err_initialRouteName, data_initialRouteName] = await tool.to(
        asyncStorage.getItem(constant.initialRouteName)
      );
      console.log(
        'MainStack.js componentDidMount data_initialRouteName=',
        data_initialRouteName,
        ' err_initialRouteName=',
        err_initialRouteName
      );
      //保证 WelcomePage 只显示一次
      if (data_initialRouteName) {
        console.log('App.js setInitialRouteName routes.MainTabNavigator.routeName');
        setInitialRouteName(routes.MainTabNavigator.routeName);
      } else {
        setInitialRouteName(routes.WelcomePage.routeName);
      }
    };
    get_initialRouteName().then();
    return () => {
      console.log('MainStack componentWillUnmount');
    };
  }, []);

  useNetInfoModel();
  return !initialRouteName ? (
    // 加载各种启动时需要的缓存时 ,先显示全屏菊花
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ffffff',
      }}
    >
      <ActivityIndicator size='large' />
    </View>
  ) : (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // 通用的导航栏的样式,可根据暗黑模式改变背景色和title颜色 https://www.jianshu.com/p/a2582f8b16fd
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        // headerLeft: () => (
        //   //自定义左上角返回按钮
        //   <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" />
        // ),
      }}
    >
      {/*所有 Stack.Screen 共用 Stack.Navigator里的同一个 导航栏*/}
      <Stack.Screen
        name={routes.WelcomePage.routeName}
        component={WelcomePage}
        options={{
          headerTitle: routes.WelcomePage.headerTitle,
          header: (props) => <CustomNavigationBar {...props} />,
          headerShown: true,
        }}
      />
      <Stack.Screen name={routes.MainTabNavigator.routeName} component={MainTabNavigator} />
      <Stack.Screen
        name={routes.DetailsPage.routeName}
        component={DetailsPage}
        options={{
          headerTitle: routes.DetailsPage.headerTitle,
          // header: (props) => <CustomNavigationBar {...props} />,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
