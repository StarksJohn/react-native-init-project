import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import { tool, appStyle, XView, XWidget, XText, XSize, XTSize, ResetStyle, ahooks } from 'react-native-common-tools'
import { MyStyleSheet } from '@style'
import { captureMessage, sentryLog } from '../sentry/sentry'
import { FormattedMessage } from 'react-intl'
import { useDrawerNavigator, useNavFocusListener, useBannerModel, useIntlModel } from '@useHooks'

const HomePage = ({ navigation, route }) => {
  const { networkAvailable } = useSelector((state) => state.netInfoModel)
  const dispatch = useDispatch()
  const { routes } = route.params

  const { colors } = useTheme()
  const { fetch_campaign_banner, campaign_banner } = useBannerModel()
  const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const { switchToCN, switchToEN } = useIntlModel()
  const [count, setCount] = useState(0)
  const { useInterval } = ahooks
  const { openDrawer } = useDrawerNavigator({ navigation })

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

      // setTimeout(() => {
      //   dva.getDispatch({
      //     type: testModel_effects.test,
      //     action: action.pageName,
      //     payload: '445',
      //     callback: (result) => {},
      //   });
      //   dva.getState();
      // }, 6000);

      fetch_campaign_banner()

      // componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount')
      }
    },
    [colors.text, fetch_campaign_banner, navigation, setOptions]
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
