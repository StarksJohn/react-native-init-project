// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { RouteProps } from 'react-native-common-tools'
import { SafeView } from '~components'
import { StackHeaderProps } from '@react-navigation/stack'
import { NavigationProp } from '@react-navigation/core'

export interface Props {
  navigation:NavigationProp<any>,
  scene:StackHeaderProps['scene'], // Used for page components
  route:RouteProps
}
const MinePage :React.FC<Props> = (Props) => {
  const { navigation } = Props

  const { colors } = useTheme()

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      console.log('MinePage componentDidMount navigation=', navigation)
      // const MinePageRightBtClicks = new EventListener({
      //   eventName: constant.event.MinePageRightBtClicks,
      //   eventCallback: ({}) => {
      //     // console.log('MinePage.js MinePageRightBtClicks toggleTheme=', toggleTheme);
      //   }
      // })

      // componentWillUnmount
      return () => {
        console.log('MinePage componentWillUnmount')
        // MinePageRightBtClicks.removeEventListener()
      }
    },
    [navigation]
  )

  return (
    <SafeView>
      {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
      <Text style={{ color: colors.text }}>MinePage</Text>
      {/* <Button */}
      {/*  title="Go to details screen" */}
      {/*  onPress={() => navigation.navigate('Details')} */}
      {/* /> */}
    </SafeView>
  )
}

export default MinePage
