import constant from './constants/constant';
import { IntlWrapper } from './react-intl/IntlWrapper';
// import dvaApp from './dva/dvaApp';
import { useDrawerNavigator } from './useHooks/useDrawerNavigator.js';
// import MainStack from './routes/MainStack';
import routes from './routes/routes';
import { ThemeContext } from './context/themeContext';
import DrawerContent from './routes/DrawerContent';
import SecondStack from './routes/SecondStack';
import DrawerNavigatorModel from './dva/DrawerNavigatorModel';
import intlModel from '../src/react-intl/intlModel.js';
import netInfoModel from './dva/netInfoModel/netInfoModel.js';

/**
 * 因 https://plugins.jetbrains.com/plugin/7507-commonjs-autocomplete/versions 插件在新版的 WS 里无法使用,故 以后每次新增一个文件,都在此文件里 import 一次,再 export 一下,就可以避免以后 在项目的
 *  其他地方
   * import 新增文件时 还得去找
   * 这个新增文件的 路径,直接
 *  import { constant} from "@/AllExports";
 *  const {
 *    constant
    } = AllExports;
  坑: 这个文件很容易造成循环引用
 */
const AllExports = {
  constant,
  IntlWrapper,
  // dvaApp,
  // MainStack,
  routes,
  ThemeContext,
  DrawerContent,
  SecondStack,
  DrawerNavigatorModel,
  intlModel,
  netInfoModel,
  useDrawerNavigator,
};

module.exports = AllExports;
