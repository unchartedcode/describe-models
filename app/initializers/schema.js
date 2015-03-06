import { loadModels } from 'uncharted-describe-models/utils/load-models';
import config from '../config/environment';
import { loadDefinitions } from '../utils/model-definitions';

export function initialize(/*container, application*/) {
  loadDefinitions(loadModels(config['model-schema']));
}

export default {
  name: 'uncharted-schema',
  before: 'ember-data',
  initialize: initialize
};
