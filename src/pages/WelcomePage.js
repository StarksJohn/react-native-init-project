import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import {Image, View, SafeAreaView, StyleSheet, Text} from 'react-native';
// import Text
// import Button
// import appStyle
// import ViewPropTypes
// import bizComp
// import NavBar
import PropTypes from 'prop-types';
// import TextBt
// import useNavFocusListener
// import useAppStateListener
// import useSubscribeKeyboard
// import useAndroidBackHandler
import {connect} from 'react-redux';
import {compose} from 'redux';
// import SafeView
import {useTheme} from '@react-navigation/native';
import {asyncStorage} from 'RNProjectTools';
import constant from '../constants/constant';
import routes from '../routes/routes';

// const { dp } = appStyle;

const WelcomePage = (props) => {
  // const r_nav = useRef();
  const {navigation, route} = props;
  const {setOptions} = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const {colors} = useTheme();

  // useNavFocusListener({
  //   navigation,
  //   onFocus: () => {
  //     console.log('WelcomePage onFocus isFocused=', navigation.isFocused());
  //   },
  //   isLightStatusBar: true,
  //   statusBarBackgroundColor: appStyle.appThemeColor,
  //   unfocused: () => {
  //     console.log('WelcomePage unfocused isFocused=', navigation.isFocused());
  //   },
  // });
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
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log(
        'WelcomePage componentDidMount,props=',
        props,
        ' isFocused=',
        navigation.isFocused(),
      );

      //todo
      asyncStorage
        .setItem(constant.initialRouteName, routes.MainTabNavigator.routeName)
        .then();
      setTimeout(() => {
        routes.reset(navigation, routes.MainTabNavigator.routeName);
      }, 3000);
      //componentWillUnmount
      return () => {
        console.log('WelcomePage componentWillUnmount');
      };
    },
    [],
  );

  /*
  componentDidUpdate
  */
  useEffect(() => {
    console.log('WelcomePage componentDidUpdate');
  });

  // const renderNav = () => {
  //   return (
  //     <NavBar
  //       style={{backgroundColor: appStyle.appThemeColor}}
  //       ref={r_nav}
  //       titleShape={{titleText: ''}}
  //     />
  //   );
  // };

  //render
  return (
    // <SafeView>
    //   <>{renderNav()}</>
    // </SafeView>
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text>WelcomePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

WelcomePage.propTypes = {};

WelcomePage.defaultProps = {};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

// const enhance = compose(connect(mapStateToProps, mapDispatchToProps));
//
// export default enhance(memo(WelcomePage));
export default WelcomePage;
