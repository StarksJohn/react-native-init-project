import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'

/**
 * const { openDrawer } = useDrawerNavigator({ navigation });
 * @param navigation
 * @returns {{openDrawer: (function(): *)}}
 */
const useDrawerNavigator = ({ navigation }) => {
  const openDrawer = useCallback(() => {
    console.log('useDrawerNavigator.js  openDrawer navigation=', navigation)
    return navigation?.openDrawer()
  }, [navigation])

  return { openDrawer }
}

export { useDrawerNavigator }
