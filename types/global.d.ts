/**
 * https://juejin.cn/post/6844904071137247240
 * Now that TypeScript is used, there is no need to worry about adding attributes to the global object and polluting it
 */

// @ts-ignore
// eslint-disable-next-line no-unused-vars
declare const global: {
  ios: boolean
  android: boolean
}
