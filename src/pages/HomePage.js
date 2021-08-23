import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import { tool, appStyle, XView, XWidget, XText, XSize, List, ahooks, MyStyleSheet } from 'react-native-common-tools'
import { captureMessage, sentryLog } from '../sentry/sentry'
import { FormattedMessage } from 'react-intl'
import { useDrawerNavigator, useNavFocusListener, useBannerModel, useIntlModel } from '@useHooks'
import { login } from '@api'
import { SpringScrollView } from 'react-native-spring-scrollview'

const arr = []
for (let i = 0; i < 50; ++i) arr.push(i)

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
  const _topInput = useRef(null)
  const _bottomInput = useRef(null)

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
       {/* https://bolan9999.github.io/react-native-spring-scrollview/#/zh-cn/V3/BasicContent 必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。SpringScrollView默认具有{flex:1}的样式，因此要使SpringScrollView正常工作，它的父容器必须是确定高度的，你也可以通过手动指定样式，使之正常工作。 */}
      <SpringScrollView
        // style控制外层包裹视图的样式
        style={{ width: '100%' }}
        // contentStyle控制内层视图的样式
        contentStyle={{ width: '100%', backgroundColor: 'lightgray' }}
        bounces={true} scrollEnabled={true} showsVerticalScrollIndicator={true}
        // 支持双向滑动的情况下(也就是 子节点的内容超过了 content 的范围)，控制一次滑动是否只允许水平或垂直一个方向
        directionalLockEnabled={true}
        // 拖拽 SpringScrollView 是否收起键盘
        dragToHideKeyboard={true}
        // 不同的系统，不同的三方输入法，键盘的工具栏高度是不确定的，并且官方没有给出获取工具栏高度的办法，这个属性用以给用户小幅调整键盘弹起时，组件偏移的位置
        inputToolBarHeight={44}
        // 当值为 true 时，滚动条会停在设置的pageSize整数倍位置。这个属性在iOS和安卓上都支持双向分页。
        pagingEnabled={false}
        // 配合pagingEnabled使用分页，使滑动停止在设置的整数倍位置。同时支持水平和垂直双向分页。0代表使用SpringScrollView的视口大小。
        pageSize={{ width: 0, height: 0 }}
        // 将TextInput的引用传入，让SpringScrollView自动管理键盘遮挡问题
        textInputRefs={[_topInput]}
        initialContentOffset={{ x: 0, y: 0 }}>
        <View style={[styles.row, { }]}>
          <Button
            title='Go to details screen'
            onPress={() => {
              routes.push(navigation, routes.DetailsPage.routeName)
            }}
          />
        </View>
        <View style={[styles.row, { }]}>
          <Button
            title='测试Sentry'
            onPress={() => {
              sentryLog('captureMessage3333')
              sentryLog('captureMessage4444')
              captureMessage()
            }}
          />
        </View>
        <View style={[styles.row, { }]}>
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
        <View style={[styles.row, { }]}>
          <Button
            title="show drawer"
            onPress={() => {
              console.log('HomePage.js openDrawer navigation=', navigation)
              openDrawer()
            }}
          />
        </View>
        <View style={[styles.row, { }]}>
          <Button
            title="登录"
            onPress={() => {
              login().then()
            }}
          />
        </View>
        <TextInput
          ref={_topInput}
          style={styles.input}
          returnKeyType="next"
          placeholder="Keyboard Test Top"
        />
      </SpringScrollView>
    </SafeView>
  )
}

export default HomePage

const styles = MyStyleSheet.create({
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 44,
    backgroundColor: appStyle.randomColor()
  }
})
