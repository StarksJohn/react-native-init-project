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
import {appStyle} from '@RNProjectTools';
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

  // SafeAreaView: 安全区外层的根视图
  return (
    <SafeAreaView
      style={[appStyle.safeAreaView, {backgroundColor: colors.primary}]}>
      {
        avoidBlankSpaceAtTheBottomOfSafeAreaView({})
        // appStyle.pageStyle.backgroundColor,
      }
      {/*安全区域*/}
      <View style={[Styles.page, {backgroundColor: colors.primary}]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

/**
 * Avoid a background color that is not white at the bottom on bangs devices such as ipx
 * 避免在长屏手机上,安全区底部和物理屏幕底部有内边距时,内边距的背景色和安全区背景色不一致
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
        height: appStyle.safeAreaInsets.bottom / 2,
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
