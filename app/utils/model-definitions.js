import { loadModels } from 'uncharted-describe-models/utils/load-models';

let Definitions = {};

let loadDefinitions = function(definitions) {
  for (let key in definitions) {
    if (!definitions.hasOwnProperty(key)) {
      continue;
    }

    Definitions[key] = definitions[key];
  }
};

let modelNames = function() {
  let names = [];
  for (let key in Definitions) {
    if (!Definitions.hasOwnProperty(key)) {
      continue;
    }

    names.push('model:'+key);
  }
  return names;
};

let loadModelDefinitions = function(schema) {
  return function() {
    loadDefinitions(loadModels(schema));
    this.needs.push.apply(this.needs, modelNames());
  };
};

export default Definitions;
export { loadDefinitions, modelNames, loadModelDefinitions };
