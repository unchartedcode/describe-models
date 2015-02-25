import { loadModels } from 'uncharted-describe-models/utils/load-models';

var Definitions = {};

var loadDefinitions = function(definitions) {
  for (var key in definitions) {
    if (!definitions.hasOwnProperty(key)) {
      continue;
    }

    Definitions[key] = definitions[key];
  }
};

var modelNames = function() {
  var names = [];
  for (var key in Definitions) {
    if (!Definitions.hasOwnProperty(key)) {
      continue;
    }

    names.push('model:'+key);
  }
  return names;
};

var loadModelDefinitions = function(schema) {
  return function() {
    loadDefinitions(loadModels(schema))
    this.needs.push.apply(this.needs, modelNames())
  }
};

export default Definitions;
export { loadDefinitions, modelNames, loadModelDefinitions };
