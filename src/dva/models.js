/**
 * 不同 业务逻辑的 数据放不同的 model里,最终组成最大的State
 * Put the states of different business logics into different models to form the largest state
 */
import _ from 'lodash';
import testModel from './testModel';
import modelTools from './modelTools';

const modelListOOTB = [];
const customizedModelList = [testModel];
let modelList = [];
modelList = modelList.concat(modelListOOTB.filter((it) => _.isString(it)));
modelList = modelList.concat(
  customizedModelList.filter((it) => _.isString(it)),
);
modelList = modelList.concat(modelListOOTB.filter((it) => _.isObject(it)));
modelList = modelList.concat(
  customizedModelList.filter((it) => _.isObject(it)),
);
const modelContainer = {};
_.forEach(modelList, (it) => {
  const nameSpace = _.isString(it) ? it : it.namespace;

  let modelObj = modelTools.createDefault(nameSpace);
  if (!_.isString(it)) {
    modelObj = _.merge(modelObj, it);
  }
  modelContainer[nameSpace] = modelObj;
});
const models = _.values(modelContainer);

export default models;
