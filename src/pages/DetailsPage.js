import React, { useEffect, useRef, useCallback } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeView } from '~components'
import { useAndroidBackHandler, MyStyleSheet, appStyle, Math, List, mockData } from 'react-native-common-tools'
import { useNavFocusListener } from '~useHooks'
import { MediaWrapper } from 'react-native-largelist'
import { loading } from '~res'

const { one_section_array } = mockData

const DetailsPage = ({ navigation }) => {
  const { setOptions } = navigation // 在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const { colors } = useTheme()
  const refList = useRef(null)
  const ref_heightForIndexPath = useRef([])// 数组里每个{}代表一页数据的每条数据的高度,eg:[ {items:[111,222]} ],用于等高列表

  useNavFocusListener({
    onFocus: () => {
      console.log('DetailsPage.js onFocus isFocused=', navigation.isFocused())
    },
    unfocused: () => {
      console.log('MinePage.js unfocused isFocused=', navigation.isFocused())
    }
  })

  // 生成一个section里的每条row的随机高
  const initOneSectionRowsH = useCallback(
    ({ rowNums }) => {
      console.log('DetailsPage.js initOneSectionRowsH   rowNums=', rowNums)
      const arr = []
      for (let i = 0; i < rowNums; i++) {
        arr.push(Math.randomNums(100, 300))
      }
      console.log('DetailsPage.js initOneSectionRowsH arr=', arr)
      ref_heightForIndexPath.current.push({ items: arr })
      console.log('DetailsPage.js ref_heightForIndexPath.current=', ref_heightForIndexPath.current)
    },
    []
  )

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
      // refList.current.beginRefresh()

      // componentWillUnmount
      return () => {
        console.log('DetailsScreen componentWillUnmount')
      }
    },
    [colors.text, navigation, setOptions]
  )

  return (
    <SafeView>
      <Button
        title='scrollTo'
        onPress={() => {
          refList.current.scrollTo({ x: 0, y: 100 })
        }}
      />
      <Button
        title='scrollToIndexPath'
        onPress={() => {
          refList.current.scrollToIndexPath({ section: 3, row: 2 })
        }}
      />
        <List ref={refList} onRefresh={({ page }) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('DetailsPage.js onRefresh page =', page)
              console.log('DetailsPage.js onRefresh resolve =', one_section_array[page - 1])
              initOneSectionRowsH({ rowNums: one_section_array[page - 1].length })
              resolve(one_section_array[page - 1])
            }, 1000)
          })
        }} onLoading={({ page }) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('DetailsPage.js onLoading page =', page)
              if (page - 1 > one_section_array.length - 1) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(null)
              } else {
                console.log('DetailsPage.js onLoading resolve =', one_section_array[page - 1])
                initOneSectionRowsH({ rowNums: one_section_array[page - 1].length })

                resolve(one_section_array[page - 1])
              }
            }, 1000)
          })
        }} heightForIndexPath={({ section, row }) => {
          const heightForIndexPath = ref_heightForIndexPath.current[section].items[row]
          console.log('DetailsPage.js heightForIndexPath ref_heightForIndexPath.current=', ref_heightForIndexPath.current, ' section=', section, '  row=', row, ' height=', heightForIndexPath)
          return heightForIndexPath
        }} renderIndexPath={({ section, row, mediaWrapperParam, rowData }) => {
          console.log('DetailsPage.js renderIndexPath section=', section, ' \n row=', row, ' \n rowData=', rowData)
          // 画 大图片视频列表的每个row https://bolan9999.github.io/react-native-largelist/#/zh-cn/V3/BigMedia
          return (
            <View style={[styles.row, { }]}>
              <Image
                style={[styles.mediaWrapper, { backgroundColor: appStyle.randomColor() }]}
                source={{ uri: rowData }}
              />

            </View>
          )
        }}></List>
    </SafeView>
  )
}

export default DetailsPage

const styles = MyStyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mediaWrapper: {
    width: '80%', height: '80%'
  },
  loadingImg: {
    width: 128, height: 128
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#EEE'
  }
})
