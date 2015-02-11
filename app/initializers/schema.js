import UnchartedAjax from 'uncharted-ajax';
import DS from 'ember-data';
import LoadModels from 'uncharted-describe-models/utils/load-models';

export function initialize(container, application) {
  application.deferReadiness();

  UnchartedAjax({
    url: '/api/describe/models',
  }).then(function(result) {
    LoadModels(result, container, application);
  }).finally(function() {
    application.advanceReadiness();
  })
}

export default {
  name: 'uncharted-schema',
  initialize: initialize
};
