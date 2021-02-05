const testModel = 'testModel';

const initState = {
  pageName: 'HomePages',
};

export const testModel_effects = {
  test: `${testModel}/test`,
};
export const actionForReducers = {
  pageName: 'pageName',
};

export default {
  namespace: testModel,
  state: initState,
  effects: {
    *test({payload, callback}, {put, select}) {
      console.log('testModel.js effects test payload=', payload);
      const state = yield select((state) => state); //这里就获取到了当前state中的数据num
      console.log('testModel.js effects test 全局state=', state);

      yield put({type: actionForReducers.pageName, payload});
      callback('ok');
    },
  },
  reducers: {
    [actionForReducers.pageName](state, {payload}) {
      console.log('testModel.js reducers pageName payload=', payload);
      return {
        ...state,
        pageName: payload,
      };
    },
  },
};
