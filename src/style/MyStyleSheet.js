import {StyleSheet} from 'react-native';
import {ResetStyle, XWidget} from '@RNProjectTools';
console.log('MyStyleSheet.js initReferenceScreen ');
/**
 * 因项目里用了MyStyleSheet,而MyStyleSheet编译时间早于app.js,故在此初始化屏幕适配配置
 */
XWidget.initResource('') //网络图片的 Baseurl ,设置了之后，用图片的时候就只需要设置后缀就行了
  .initReferenceScreen(375, 677); //为了让 XView等 控件 适配不同屏幕,达到自动缩放效果

/**
 * 只能放到主项目,否则 StyleSheet.create 方法的执行就会早于 XWidget.initReferenceScreen,导致 计算错误
 * eg:
 *    const myStyleSheet = MyStyleSheet.create({
        v: {
          height: 50,
          fontSize: 16,
        },
      });
 * @type {{create(*): *}}
 */
let MyStyleSheet = {
  create(style) {
    console.log('MyStyleSheet.js create');
    let s = style;
    //目前仅对以下的属性进行等比例缩放处理
    let outKey;
    for (outKey in s) {
      s[outKey] = ResetStyle(s[outKey]);
    }
    console.log('MyStyleSheet.js s=', JSON.stringify(s));
    return StyleSheet.create(s);
  },
};

export default MyStyleSheet;
