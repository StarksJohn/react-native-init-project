/**
 * https://juejin.cn/post/6844904071137247240
 */

import { Platform } from 'react-native'

// @ts-ignore
global.ios = Platform.OS === 'ios'
// @ts-ignore
global.android = Platform.OS === 'android'
