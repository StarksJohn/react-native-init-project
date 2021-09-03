// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { asyncStorage, RouteProps } from 'react-native-common-tools'
import { constant } from '~constant'
import { NavigationProp } from '@react-navigation/core'
import { StackHeaderProps } from '@react-navigation/stack'
import { routes } from '~routes'

export interface Props {
    navigation:NavigationProp<any>,
    scene:StackHeaderProps['scene'], // Used for page components
    route:RouteProps
}
const WelcomePage:React.FC<Props> = (Props) => {
  const { navigation } = Props
  console.log('WelcomePage.js routes=', routes)
  const { colors } = useTheme()

  // useAppStateListener({
  //   onChange: (appState) => {
  //     console.log(
  //       'WelcomePage useAppStateListener onChange appState=',
  //       appState,
  //     );
  //   },
  // });
  // useSubscribeKeyboard({
  //   keyboardShow: ({keyboardH}) => {
  //     console.log(
  //       'WelcomePage useSubscribeKeyboard keyboardShow keyboardH=',
  //       keyboardH,
  //     );
  //   },
  //   keyboardHide: () => {
  //     console.log('WelcomePage useSubscribeKeyboard keyboardHide');
  //   },
  // });
  // useAndroidBackHandler({
  //   navigation,
  // });

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      setTimeout(() => {
        routes.reset(navigation, routes.MainTabNavigator.routeName)
        asyncStorage.setItem(constant.initialRouteName, routes.MainTabNavigator.routeName).then()
      }, 3000)
      // componentWillUnmount
      return () => {
        console.log('WelcomePage componentWillUnmount')
      }
    },
    []
  )

  /*
  componentDidUpdate
  */
  useEffect(() => {
    console.log('WelcomePage componentDidUpdate')
  })

  // const renderNav = () => {
  //   return (
  //     <NavBar
  //       style={{backgroundColor: appStyle.appThemeColor}}
  //       ref={r_nav}
  //       titleShape={{titleText: ''}}
  //     />
  //   );
  // };

  // render
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>WelcomePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  }
})

WelcomePage.propTypes = {}

WelcomePage.defaultProps = {}

export default WelcomePage
