import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useNavFocusListener from '../components/useNavFocusListener';
import routes from '../routes/routes';
import SafeView from '../components/SafeView';

const HomePage = ({navigation}) => {
  const {colors} = useTheme();
  const {setOptions} = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const theme = useTheme();

  useNavFocusListener({
    onFocus: () => {
      console.log('HomePage.js onFocus isFocused=', navigation.isFocused());
      // setOptions({ no effect
      //   headerShown: false,
      // });
    },
    unfocused: () => {
      console.log('MinePage.js unfocused isFocused=', navigation.isFocused());
    },
  });

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      //todo
      console.log('HomePage componentDidMount ');

      //componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount');
      };
    },
    [colors.text, navigation, setOptions],
  );

  return (
    <SafeView>
      {/*<StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />*/}
      <Text style={{color: colors.text}}>HomePage</Text>
      <Button
        title="Go to details screen"
        onPress={() => {
          routes.push(navigation, routes.DetailsPage.routeName);
        }}
      />
    </SafeView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
