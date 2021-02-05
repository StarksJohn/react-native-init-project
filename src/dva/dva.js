import {create} from 'dva-core';
// import {createLogger} from "redux-logger";
import immer from 'dva-immer';

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
  app.use(immer());

  if (!registered) {
    opt.models.forEach((model) => app.model(model));
  }
  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err) {
      console.log(err);
    },
  });

  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
