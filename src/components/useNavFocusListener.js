import React, {useEffect, useCallback} from 'react';
import {StatusBar, Platform} from 'react-native';
import {appStyle} from 'RNProjectTools';
import {useFocusEffect} from '@react-navigation/native';

useNavFocusListener.propTypes = {};

useNavFocusListener.defaultProps = {};

/**
 * PureComponent
 * eg:
 *    useNavFocusListener({
        navigation, onFocus: () => {
          console.log(`useNavFocusListener onFocus`)
        }, isLightStatusBar: true,
      })
 * @param props
 * @returns {*}
 * @constructor
 */
export default function useNavFocusListener(props) {
  const {
    onFocus,
    unfocused,
    isDarkStatusBar,
    isLightStatusBar = true,
    statusBarBackgroundColor = appStyle.appThemeColor,
  } = props;

  // https://blog.csdn.net/Cui_xing_tian/article/details/105294567
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log('useNavFocusListener.js focused');
      _onFocus();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        unfocused && unfocused();
        console.log('useNavFocusListener.js unfocused');
      };
    }, [_onFocus, unfocused]),
  );

  const _onFocus = useCallback(() => {
    console.log('useNavFocusListener useCallback,onFocus');

    if (isLightStatusBar) {
      Platform.OS === 'android' && StatusBar.setTranslucent(false);
      StatusBar.setBarStyle('light-content', true);
    } else if (isDarkStatusBar) {
      Platform.OS === 'android' && StatusBar.setTranslucent(false);
      StatusBar.setBarStyle('dark-content', true);
    }
    if (statusBarBackgroundColor && Platform.OS === 'android') {
      StatusBar.setBackgroundColor(statusBarBackgroundColor);
    }

    onFocus && onFocus();
  }, [isDarkStatusBar, isLightStatusBar, onFocus, statusBarBackgroundColor]);

  /**
   * componentDidMount && componentWillUnmount
   */
  // useEffect(
  //   /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
  //   () => {
  //     console.log(`useNavFocusListener componentDidMount,props=`, props)
  //
  //     //todo
  //     const focusListener = navigation?.addListener('focus', _onFocus)
  //     //componentWillUnmount
  //     return () => {
  //       console.log(`useNavFocusListener componentWillUnmount`)
  //       focusListener()
  //     }
  //   }, [])

  /*
 componentDidUpdate
 */
  useEffect(() => {
    console.log('useNavFocusListener componentDidUpdate');
  });
}
