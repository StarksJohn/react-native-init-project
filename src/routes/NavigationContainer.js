import React, { useEffect, useRef, useState, useMemo, memo, useCallback, useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import routes from './routes.js'
import SecondStack from './SecondStack.js'
import MainStack from './MainStack.js'
import DrawerContent from './DrawerContent.js'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
const Drawer = createDrawerNavigator()

/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
const _NavigationContainer = ({ theme }) => {
  const { useDrawer } = useSelector((state) => state.DrawerNavigatorModel)
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
