import {create} from 'dva-core';

let app;
let store;
let dispatch;
let registered;

function createApp(opt) {
  // redux 的日志
  // if (opt.enableLog) {
  //   opt.onAction = [createLogger()]
  // }
  app = create(opt);

  if (!registered) {
    opt.models.forEach((model) => app.model(model));
  }
  registered = true;

  //https://dvajs.com/api/#app-dva-opts
  app.use({
    onError(err) {
      console.log('dva.js onError=', err);
    },
  });

  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  //任何地方都可以访问到dispatch
  getDispatch(p) {
    return app.dispatch(p);
  },
  //任何地方都可访问到的所有model的 集合
  getState: () => {
    let state = app.getStore().getState();
    console.log('dva.js getState=', state);
    return state;
  },
};
