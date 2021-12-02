/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry, Platform, Text, TextInput } from 'react-native'
// eslint-disable-next-line no-unused-vars
import { sentryLog } from 'sentry/sentry' // init sentry
import './global'
import App from './App'
import { name as appName } from './app.json'
import { constant } from '~constant'
if (!constant.fakeData && process.env.NODE_ENV === 'production') {
  // release package
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    assert: () => {}
  }
} else {
  // console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key']
  // LogBox.ignoreLogs('Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key')
  // console.disableYellowBox = true //
  // LogBox.ignoreAllLogs(true)
  console.disableYellowBox = true
}
if (Platform.OS === 'android') {
  // for init  react_intl module
  require('intl')
  require('intl/locale-data/jsonp/en')
}

// 设置字体大小不随系统字体大小变化而变化
Text.defaultProps = { ...Text.defaultProps, allowFontScaling: false }
TextInput.defaultProps = { ...TextInput.defaultProps, allowFontScaling: false }

AppRegistry.registerComponent(appName, () => App)
