import { loadModels } from 'ember-cli-uncharted-describe-models/utils/load-models';

const Definitions = {};

const loadDefinitions = function(definitions) {
  for (const key in definitions) {
    if (!definitions.hasOwnProperty(key)) {
      continue;
    }

    Definitions[key] = definitions[key];
  }
};

const loadModelDefinitions = function(schema, options) {
  return function() {
    loadDefinitions(loadModels(schema, options));
  };
};

export default Definitions;
export { loadDefinitions, loadModelDefinitions };
