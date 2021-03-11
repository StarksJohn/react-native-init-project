import React, {useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useNavFocusListener from '../components/useNavFocusListener';
import routes from '../routes/routes';
import SafeView from '../components/SafeView';
import {useSelector, useDispatch} from 'react-redux';
import {effects as testModel_effects, action} from '../dva/testModel';
import api from '../api/api';
import {
  tool,
  appStyle,
  XView,
  XWidget,
  XText,
  XSize,
  XTSize,
  ResetStyle,
} from 'RNProjectTools';
import MyStyleSheet from '../style/MyStyleSheet';
import {captureMessage, sentryLog} from '../sentry/sentry';

const HomePage = ({navigation}) => {
  const testModel = useSelector((state) => state.testModel);
  const networkAvailable = useSelector(
    (state) => state.netInfoModel.networkAvailable,
  );
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {setOptions} = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd

  console.log('HomePage.js testModel=', testModel);
  const test = useCallback(
    (payload) =>
      dispatch({
        type: testModel_effects.saveSomeThing,
        action: action.pageName,
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
      setTimeout(async () => {
        test('首页');
        {
          const [err, data] = await tool.to(api.anime());
          // console.log('HomePage.js api.anime data=', data);
          if (data) {
          } else {
          }
        }
      }, 1000);

      // setTimeout(() => {
      //   dva.getDispatch({
      //     type: testModel_effects.test,
      //     action: action.pageName,
      //     payload: '445',
      //     callback: (result) => {},
      //   });
      //   dva.getState();
      // }, 6000);

      //componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount');
      };
    },
    [colors.text, navigation, setOptions],
  );

  console.log('HomePage.js render testModel=', testModel);
  console.log('HomePage.js render networkAvailable=', networkAvailable);

  return (
    <SafeView>
      <Text style={{color: colors.text}}>{testModel.pageName}</Text>
      <Button
        title="Go to details screen"
        onPress={() => {
          routes.push(navigation, routes.DetailsPage.routeName);
        }}
      />
      <Text style={{color: colors.text}}>
        networkAvailable={JSON.stringify(networkAvailable)}
      </Text>
      <View
        style={ResetStyle({
          width: '100%',
          height: 50,
          backgroundColor: appStyle.randomColor(),
        })}>
        <Text
          style={ResetStyle({
            color: colors.text,
            alignSelf: 'center',
            fontSize: 16,
          })}>
          ResetStyle=
          {
            ResetStyle({
              width: '100%',
              height: 50,
              backgroundColor: appStyle.randomColor(),
            }).height
          }
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: appStyle.dp(50),
          backgroundColor: appStyle.randomColor(),
        }}>
        <Text
          style={{
            color: colors.text,
            alignSelf: 'center',
            fontSize: appStyle.dp(16),
          }}>
          dp={appStyle.dp(50)} dp={appStyle.dp(16)}
        </Text>
      </View>
      <View style={myStyleSheet.v}>
        <Text style={myStyleSheet.text}>
          myStyleSheet={styles.v.height} myStyleSheet=
          {styles.v.fontSize}
        </Text>
      </View>
      <XView
        style={{
          width: '100%',
          height: 50,
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: appStyle.randomColor(),
        }}>
        <XText
          style={{
            color: colors.text,
            alignSelf: 'center',
            fontSize: 16,
          }}
          text={'XView'}
        />
      </XView>
      <Button
        title="captureMessage"
        onPress={() => {
          sentryLog('captureMessage3333');
          sentryLog('captureMessage4444');
          captureMessage();
        }}
      />
    </SafeView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  v: {
    width: '100%',
    height: XSize(50),
    backgroundColor: appStyle.randomColor(),
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: XTSize(16),
  },
});
const myStyleSheet = MyStyleSheet.create({
  v: {
    width: '100%',
    height: 50,
    backgroundColor: appStyle.randomColor(),
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16,
  },
});
