import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Image, View, SafeAreaView, StyleSheet} from 'react-native';
import {appStyle} from 'RNProjectTools';
import {useTheme} from '@react-navigation/native';

const {dp} = appStyle;

/**
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const SafeView = ({children}) => {
  const {colors} = useTheme();

  // render
  return (
    <SafeAreaView
      style={[appStyle.safeAreaView, {backgroundColor: colors.primary}]}>
      {
        avoidBlankSpaceAtTheBottomOfSafeAreaView({})
        // appStyle.pageStyle.backgroundColor,
      }
      <View style={[Styles.page, {backgroundColor: colors.primary}]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

/**
 * Avoid a background color that is not white at the bottom on bangs devices such as ipx
 * @param color
 * @returns {*}
 */
export const avoidBlankSpaceAtTheBottomOfSafeAreaView = ({color = '#fff'}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {colors} = useTheme();

  return (
    <View
      style={{
        width: '100%',
        height: dp(200),
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.primary,
      }}
    />
  );
};

const Styles = StyleSheet.create({
  page: {
    ...appStyle.pageStyle,
    justifyContent: 'flex-end',
  },
});

SafeView.propTypes = {};

SafeView.defaultProps = {};

export default SafeView;
