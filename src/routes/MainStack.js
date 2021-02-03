import React from 'react';
import {useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './routes';
import WelcomePage from '../pages/WelcomePage';
import CustomNavigationBar from '../components/CustomNavigationBar';
import MainTabNavigator from './MainTabNavigator';
import DetailsPage from '../pages/DetailsPage';

const Stack = createStackNavigator();

const MainStack = ({initialRouteName}) => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // 通用的导航栏的样式,可根据暗黑模式改变背景色和title颜色
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
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
      <Stack.Screen
        name={routes.MainTabNavigator.routeName}
        component={MainTabNavigator}
      />
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
