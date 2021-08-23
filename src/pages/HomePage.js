import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, StatusBar, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import { tool, appStyle, XView, XWidget, XText, XSize, mockData, List, ahooks, MyStyleSheet } from 'react-native-common-tools'
import { captureMessage, sentryLog } from '../sentry/sentry'
import { FormattedMessage } from 'react-intl'
import { useDrawerNavigator, useNavFocusListener, useBannerModel, useIntlModel } from '@useHooks'
import { login } from '@api'

const { one_section_array } = mockData

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
  const refList = useRef(null)

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

      <List ref={refList} onRefresh={({ page }) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([1, 2, 3, 4, 5])
          }, 1000)
        })
      }} onLoading={({ page }) => {
      }} heightForIndexPath={({ section, row }) => {
        return 100
      }} renderIndexPath={({ section, row, mediaWrapperParam, rowData }) => {
        switch (row) {
          case 0: {
            return (
                  <View style={[styles.row, { }]}>
                    <Button
                      title='Go to details screen'
                      onPress={() => {
                        routes.push(navigation, routes.DetailsPage.routeName)
                      }}
                    />
                  </View>
            )
          }
          case 1: {
            return <View style={[styles.row, { }]}>
              <Button
                title='测试Sentry'
                onPress={() => {
                  sentryLog('captureMessage3333')
                  sentryLog('captureMessage4444')
                  captureMessage()
                }}
              />
            </View>
          }
          case 2: {
            return <View style={[styles.row, { }]}>
              <Button
                title="切换为中文"
                onPress={() => {
                  switchToCN()
                }}
              />
              <Text style={{ color: colors.text }}>
                 <FormattedMessage id='welcome' />
              </Text>
              <Button
                title="切换为英文"
                onPress={() => {
                  console.log('HomePage.js 切换为英文')
                  switchToEN()
                }}
              />
            </View>
          }
          case 3: {
            return <View style={[styles.row, { }]}>
              <Button
                title="show drawer"
                onPress={() => {
                  console.log('HomePage.js openDrawer navigation=', navigation)
                  openDrawer()
                }}
              />
            </View>
          }
          case 4: {
            return <View style={[styles.row, { }]}>
               <Button
                title="登录"
                onPress={() => {
                  login().then()
                }}
               />
            </View>
          }
        }
      }}></List>
    </SafeView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  v: {
    width: 375,
    height: 50,
    backgroundColor: appStyle.randomColor()
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
const myStyleSheet = MyStyleSheet.create({
  v: {
    width: 375,
    height: 50,
    backgroundColor: appStyle.randomColor()
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 16
  }
})
