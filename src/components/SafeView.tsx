// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react'
import { View, SafeAreaView } from 'react-native'
import { appStyle, RouteProps, MyStyleSheet } from 'react-native-common-tools'
import { useTheme } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/core'
import { StackHeaderProps } from '@react-navigation/stack'

/**
 * 安全区外层的根视图
 * PureComponent
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
export interface Props {
    navigation?:NavigationProp<any>,
    scene?:StackHeaderProps['scene'], // Used for page components
    route?:RouteProps,
    children?: ReactNode
}
const SafeView:React.FC<Props> = (Props) => {
  const { children } = Props

  const { colors } = useTheme()

  // SafeAreaView: 安全区外层的根视图
  return (
    <SafeAreaView style={[appStyle.safeAreaView, { backgroundColor: colors.primary }]}>
      {
        avoidBlankSpaceAtTheBottomOfSafeAreaView({})
        // appStyle.pageStyle.backgroundColor,
      }
      {/* 安全区域 */}
      {/*  @ts-ignore */}
        <View style={[styles.page, { backgroundColor: colors.primary }]}>{children}</View>
    </SafeAreaView>
  )
}

/**
 * Avoid a background color that is not white at the bottom on bangs devices such as ipx
 * 避免在长屏手机上,安全区底部和物理屏幕底部有内边距时,内边距的背景色和安全区背景色不一致
 * @param color
 * @returns {*}
 */
export const avoidBlankSpaceAtTheBottomOfSafeAreaView = ({ color = '#fff' }) => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        width: '100%',
        // @ts-ignore
        height: appStyle.safeAreaInsets.bottom / 2,
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.primary
      }}
    />
  )
}

const styles = MyStyleSheet.create({
  // @ts-ignore
  page: {
    ...appStyle.pageStyle,
    justifyContent: 'flex-end'
  }
})

SafeView.propTypes = {}

SafeView.defaultProps = {}

export default SafeView
