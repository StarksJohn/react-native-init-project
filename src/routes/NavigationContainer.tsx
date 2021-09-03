// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import routes from './routes'
import SecondStack from './SecondStack.js'
import MainStack from './MainStack'
import DrawerContent from './DrawerContent'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { dvaState } from '~dva'

const Drawer = createDrawerNavigator()

/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
export interface Props {
    theme:Theme | undefined,
}
const _NavigationContainer :React.FC<Props> = (Props, parentRef) => {
  const { theme } = Props
  const { useDrawer } = useSelector((state:dvaState) => state.DrawerNavigatorModel)
  console.log('NavigationContainer.js useDrawer=', useDrawer)

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log('NavigationContainer componentDidMount')

      // componentWillUnmount
      return () => {
        console.log('NavigationContainer componentWillUnmount')
      }
    },
    []
  )

  return (
    <NavigationContainer theme={theme}>
        {/* eslint-disable-next-line multiline-ternary */}
      {useDrawer ? (
        // https://reactnavigation.org/docs/drawer-based-navigation
        // https://reactnavigation.org/docs/drawer-navigator
        <Drawer.Navigator
          initialRouteName={routes.MainStack.routeName}
          drawerType={'slide'}
          drawerPosition={'left'}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name={routes.MainStack.routeName} component={MainStack} />
          <Drawer.Screen name={routes.SecondStack.routeName} component={SecondStack} />
        </Drawer.Navigator>
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  )
}

export default _NavigationContainer
