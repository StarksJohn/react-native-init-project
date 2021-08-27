/**
 * https://juejin.cn/post/6844904071137247240
 */

import { Dimensions, Platform } from 'react-native'

global.ios = Platform.OS === 'ios'
global.android = Platform.OS === 'android'
