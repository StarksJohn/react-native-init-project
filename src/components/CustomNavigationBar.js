import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Image, View, SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Appbar, Menu } from 'react-native-paper'

/**
 * 基于 react-native-paper 的自定义导航栏 https://callstack.github.io/react-native-paper/integrate-app-bar-with-react-navigation.html
 * 坑: 无法跟着页面做Push进来的动画
 * @param props
 * @param parentRef
 * @returns {*}
 * @constructor
 */
const CustomNavigationBar = (props) => {
  const {
    navigation,
    scene,
    rightComp,
    previous /* If it has, it means there is another screen on the stack beneath the current screen and we should render the back arrow button in
     such a case 如果有的话，则意味着当前屏幕下方的堆栈中还有另一个屏幕，在这种情况下，我们应该渲染后退箭头按钮 */
  } = props
  const [visible, setVisible] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      // todo
      console.log('CustomNavigationBar componentDidMount ')

      // componentWillUnmount
      return () => {
        console.log('CustomNavigationBar componentWillUnmount')
      }
    },
    [navigation, props]
  )

  /*
  componentDidUpdate
  */
  useEffect(() => {
    // console.log('CustomNavigationBar componentDidUpdate props=', props);
  })

  console.log('CustomNavigationBar render props=', props)
  // render
  return (
    <Appbar.Header>
      {/* Whether to show the left arrow 是否显示左箭头 */}
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={scene?.descriptor?.options?.headerTitle} />
      {/* https://callstack.github.io/react-native-paper/integrate-app-bar-with-react-navigation.html hamburger menu */}
      {/* {!previous ? ( */}
      {/*  <Menu */}
      {/*    visible={visible} */}
      {/*    onDismiss={closeMenu} */}
      {/*    anchor={ */}
      {/*      <Appbar.Action icon="menu" color="white" onPress={openMenu} /> */}
      {/*    }> */}
      {/*    <Menu.Item */}
      {/*      onPress={() => { */}
      {/*        console.log('Option 1 was pressed'); */}
      {/*      }} */}
      {/*      title="Option 1" */}
      {/*    /> */}
      {/*    <Menu.Item */}
      {/*      onPress={() => { */}
      {/*        console.log('Option 2 was pressed'); */}
      {/*      }} */}
      {/*      title="Option 2" */}
      {/*    /> */}
      {/*    <Menu.Item */}
      {/*      onPress={() => { */}
      {/*        console.log('Option 3 was pressed'); */}
      {/*      }} */}
      {/*      title="Option 3" */}
      {/*      disabled */}
      {/*    /> */}
      {/*  </Menu> */}
      {/* ) : null} */}
      {rightComp}
    </Appbar.Header>
  )
}

CustomNavigationBar.propTypes = {
  rightComp: PropTypes.element
}

CustomNavigationBar.defaultProps = {
  rightComp: null
}

// const mapStateToProps = ({}) => ({});
//
// const mapDispatchToProps = {};

const Styles = StyleSheet.create({})

// const enhance = compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   ),
// );
//
// export default enhance(memo(forwardRef(CustomNavigationBar)));
export default CustomNavigationBar
