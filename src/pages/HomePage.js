import React, {useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useNavFocusListener from '../components/useNavFocusListener';
import routes from '../routes/routes';
import SafeView from '../components/SafeView';
import {useSelector, useDispatch} from 'react-redux';
import {testModel_effects} from '../dva/models/testModel';

const HomePage = ({navigation}) => {
  const testModel = useSelector((state) => state.testModel);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {setOptions} = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd

  console.log('HomePage.js testModel=', testModel);
  const test = useCallback(
    (payload) =>
      dispatch({
        type: testModel_effects.test,
        payload,
        callback: (result) => {
          console.log('HomePage.jsx test callback=', result);
        },
      }),
    [dispatch],
  );

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
      setTimeout(() => {
        test('首页');
      }, 3000);

      //componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount');
      };
    },
    [colors.text, navigation, setOptions],
  );

  console.log('HomePage.js render testModel=', testModel);
  return (
    <SafeView>
      <Text style={{color: colors.text}}>{testModel.pageName}</Text>
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
