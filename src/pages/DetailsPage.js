import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '@components'
import { useAndroidBackHandler } from 'react-native-common-tools'
import { useNavFocusListener } from '@useHooks'

const DetailsPage = ({ navigation }) => {
  const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const { colors } = useTheme()

  useNavFocusListener({
    onFocus: () => {
      console.log('DetailsPage.js onFocus isFocused=', navigation.isFocused())
    },
    unfocused: () => {
      console.log('MinePage.js unfocused isFocused=', navigation.isFocused())
    }
  })

  useAndroidBackHandler({
    navigation
    // handleBackPress: () => {
    //   console.log('DetailsPage.js 拦截退出页面 事件')
    //   return true
    // }
  })

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      console.log('DetailsScreen componentDidMount navigation=', navigation)
      // setOptions({
      //   header: (props) => <CustomNavigationBar {...props} />,
      //   headerTitle: routes.DetailsPage.headerTitle,
      //   headerShown: true,
      // });

      // componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount')
      }
    },
    [colors.text, navigation, setOptions]
  )

  return (
    <SafeView>
      <Text style={{ color: colors.text }}>Details Screen</Text>
    </SafeView>
  )
}

export default DetailsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
