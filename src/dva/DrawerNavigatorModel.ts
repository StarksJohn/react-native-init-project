import { baseModel, modelProps } from 'react-native-common-tools'

/**
 * Control whether to use Drawer.Navigator
 * @type {string}
 */
const DrawerNavigatorModel = 'DrawerNavigatorModel'
const initState = {
  useDrawer: true // Whether to use DrawerNavigator
}

/**
 * 由外部控件 dispatch 触发,effects里的值 对应 外部控件dispatch里传的 type,到 当前Model的 effects 里响应
 * @type {{awaitSaveSomeThing: string, saveSomeThing: string}}
 */
export const effects = {
  saveSomeThing: `DrawerNavigatorModel/${baseModel.baseEffects.saveSomeThing}`, // 当前model同步的直接改变此 model 的initState里的某个属性 的 effect,此effect只能由外部某个控件dispatch,接收的地方在 modelTools.js 里
  awaitSaveSomeThing: `DrawerNavigatorModel/${baseModel.baseEffects.awaitSaveSomeThing}` // 当前model异步获取api数据&&改变state
}

/**
 * 触发当前Model的 reducer
 * @type {{awaitSaveSomeThing: string, campaign_banner: string, saveSomeThing: string}}
 */
export const _action = {
  ...baseModel.baseAction,
  useDrawer: 'useDrawer' // 改变 initState里的 useDrawer 的 action
}

export interface DrawerNavigatorModelProps extends modelProps{
  useDrawer:boolean,
}

/**
 * https://dvajs.com/api/#model
 被注入到 dvaApp.ts 里
 */
export default {
  namespace: DrawerNavigatorModel,
  state: initState,
  attributesToBeCached: [_action.useDrawer], // 当前model需要被缓存的数据的key
  effects: {},
  reducers: {}
}
