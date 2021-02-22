const testModel = 'testModel';
const initState = {
  pageName: 'HomePages',
};
export const effects = {
  saveSomeThing: `${testModel}/saveSomeThing`,
};
export const action = {
  pageName: `${testModel}/pageName`,
};
const reducerName = {
  pageName: 'pageName',
};

/**
 * https://dvajs.com/api/#model
 */
export default {
  namespace: testModel,
  state: initState,
  effects: {},
  reducers: {
    [reducerName.pageName](state, {payload}) {
      console.log('testModel.js reducers pageName payload=', payload);
      return {
        ...state,
        pageName: payload,
      };
    },
  },
};
