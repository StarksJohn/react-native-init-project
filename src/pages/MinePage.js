import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { EventListener } from '@RNProjectTools';
import { constant } from '@/constant';
import { SafeView } from '@components';

const MinePage = (props) => {
  const { navigation, route } = props;

  const { colors } = useTheme();
  const { setParams } = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const theme = useTheme();

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      //todo
      console.log('MinePage componentDidMount navigation=', navigation);
      let MinePageRightBtClicks = new EventListener({
        eventName: constant.event.MinePageRightBtClicks,
        eventCallback: ({}) => {
          // console.log('MinePage.js MinePageRightBtClicks toggleTheme=', toggleTheme);
        },
      });

      //componentWillUnmount
      return () => {
        console.log('MinePage componentWillUnmount');
        MinePageRightBtClicks.removeEventListener();
      };
    },
    [navigation]
  );

  return (
    <SafeView>
      {/*<StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />*/}
      <Text style={{ color: colors.text }}>MinePage</Text>
      {/*<Button*/}
      {/*  title="Go to details screen"*/}
      {/*  onPress={() => navigation.navigate('Details')}*/}
      {/*/>*/}
    </SafeView>
  );
};

export default MinePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
