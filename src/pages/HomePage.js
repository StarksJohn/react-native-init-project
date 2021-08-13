import React, { useCallback, useEffect, useState, useRef } from 'react'
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import { tool, appStyle, XView, XWidget, XText, XSize, XTSize, ResetStyle, ahooks } from 'react-native-common-tools'
import { MyStyleSheet } from '@style'
import { captureMessage, sentryLog } from '../sentry/sentry'
import { FormattedMessage } from 'react-intl'
import { useDrawerNavigator, useNavFocusListener, useBannerModel, useIntlModel } from '@useHooks'
import { login } from '@api'
import { Pedometer } from 'expo-sensors'

const HomePage = ({ navigation, route }) => {
  const { networkAvailable } = useSelector((state) => state.netInfoModel)
  const { access_token } = useSelector((state) => state.userModel)
  const dispatch = useDispatch()
  const { routes } = route.params
  const { colors } = useTheme()
  const { fetch_campaign_banner, campaign_banner } = useBannerModel()
  const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const { switchToCN, switchToEN } = useIntlModel()
  const [count, setCount] = useState(0)
  const { useInterval } = ahooks
  const { openDrawer } = useDrawerNavigator({ navigation })
  console.log('HomePage.js access_token=', access_token)
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
  const [pastStepCount, setPastStepCount] = useState(0)
  const [currentStepCount, setCurrentStepCount] = useState(0)
  const _subscription = useRef(undefined)

  // useInterval(() => {
  //   setCount(count + 1);
  // }, 1000);

  useNavFocusListener({
    onFocus: () => {
      console.log('HomePage.js onFocus isFocused=', navigation.isFocused())
      // setOptions({ no effect
      //   headerShown: false,
      // });
    },
    unfocused: () => {
      console.log('MinePage.js unfocused isFocused=', navigation.isFocused())
    }
  })

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      console.log('HomePage componentDidMount ')
      // setTimeout(async () => {
      //   // test('首页');
      //   // {
      //   //   const [err, data] = await tool.to(api.anime());
      //   //   // console.log('HomePage.js api.anime data=', data);
      //   //   if (data) {
      //   //   } else {
      //   //   }
      //   // }
      // }, 1000)

      fetch_campaign_banner()
      _subscribe()

      // componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount')
        _unsubscribe()
      }
    },
    [colors.text, fetch_campaign_banner, navigation, setOptions]
  )

  const _subscribe = useCallback(
    () => {
      console.log('HomePage.js _subscribe ')

      _subscription.current = Pedometer.watchStepCount(result => {
        console.log('HomePage.js watchStepCount result=', result)
        setCurrentStepCount(result.steps)
      })

      Pedometer.isAvailableAsync().then(
        result => {
          setIsPedometerAvailable(String(result))
          console.log('HomePage.js isAvailableAsync result=', result)
        },
        error => {
          console.log('HomePage.js isAvailableAsync error=', error)

          setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
        }
      )

      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 1)
      console.log('HomePage.js getStepCountAsync start=', start, ' end=', end)
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          console.log('HomePage.js getStepCountAsync result=', result)

          setPastStepCount(result.steps)
        },
        error => {
          console.log('HomePage.js getStepCountAsync error=', error)

          setPastStepCount('Could not get stepCount: ' + error)
        }
      )
    },
    [dispatch]
  )
  const _unsubscribe = useCallback(
    () => {
      _subscription && _subscription.current.remove()
      _subscription.current = null
    },
    [_subscription.current]
  )

  useEffect(() => {
    console.log('HomePage.js useEffect campaign_banner=', campaign_banner)
  }, [campaign_banner])

  useEffect(() => {
    console.log('HomePage.js useEffect networkAvailable=', networkAvailable)
  }, [networkAvailable])

  return (
    <SafeView>
      <Button
        title='Go to details screen'
        onPress={() => {
          routes.push(navigation, routes.DetailsPage.routeName)
        }}
      />
      <Text style={{ color: colors.text }}>networkAvailable={networkAvailable ? '开' : '关'}</Text>
      <View
        style={ResetStyle({
          width: '100%',
          height: 50,
          backgroundColor: appStyle.randomColor()
        })}
      >
        <Text
          style={ResetStyle({
            color: colors.text,
            alignSelf: 'center',
            fontSize: 16
          })}
        >
          ResetStyle=
          {
            ResetStyle({
              width: '100%',
              height: 50,
              backgroundColor: appStyle.randomColor()
            }).height
          }
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: appStyle.dp(50),
          backgroundColor: appStyle.randomColor()
        }}
      >
        <Text
          style={{
            color: colors.text,
            alignSelf: 'center',
            fontSize: appStyle.dp(16)
          }}
        >
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
          backgroundColor: appStyle.randomColor()
        }}
      >
        <XText
          style={{
            color: colors.text,
            alignSelf: 'center',
            fontSize: 16
          }}
          text={'XView'}
        />
      </XView>
      <Button
        title='测试Sentry'
        onPress={() => {
          sentryLog('captureMessage3333')
          sentryLog('captureMessage4444')
          captureMessage()
        }}
      />
      <Text style={{ color: colors.text }}>
        当前的语言是: <FormattedMessage id='welcome' />
      </Text>
      <Button
        title="切换为中文"
        onPress={() => {
          console.log('HomePage.js 切换为中文')
          switchToCN()
        }}
      />
      <Button
        title="切换为英文"
        onPress={() => {
          console.log('HomePage.js 切换为英文')
          switchToEN()
        }}
      />
      <Text style={{ color: colors.text }}>测试 ahooks的 useInterval = {count}</Text>
      <Button
        title="show drawer"
        onPress={() => {
          console.log('HomePage.js openDrawer navigation=', navigation)
          openDrawer()
        }}
      />
      <Button
        title="登录"
        onPress={() => {
          login().then()
        }}
      />
      <Text style={{ color: colors.text }}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text style={{ color: colors.text }}>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text style={{ color: colors.text }}>Walk! And watch this go up: {currentStepCount}</Text>

    </SafeView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  v: {
    width: '100%',
    height: XSize(50),
    backgroundColor: appStyle.randomColor()
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: XTSize(16)
  }
})
const myStyleSheet = MyStyleSheet.create({
  v: {
    width: '100%',
    height: 50,
    backgroundColor: appStyle.randomColor()
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16
  }
})
