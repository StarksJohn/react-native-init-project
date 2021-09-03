// eslint-disable-next-line no-unused-vars
import React, { useCallback } from 'react'
import { NavigationProp } from '@react-navigation/core'

/**
 * const { openDrawer } = useDrawerNavigator({ navigation });
 * @param navigation
 * @returns {{openDrawer: (function(): *)}}
 */
export interface Props {
  navigation:NavigationProp<any>,
}
const useDrawerNavigator = (props: Props) => {
  const { navigation } = props

  const openDrawer = useCallback(() => {
    console.log('useDrawerNavigator.js  openDrawer navigation=', navigation)
    // @ts-ignore
    return navigation?.openDrawer()
  }, [navigation])

  return { openDrawer }
}

export { useDrawerNavigator }
