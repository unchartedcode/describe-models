import generatedModel from '../../../utils/generated-model';
import { loadDefinitions } from '../../../utils/model-definitions';

module('generatedModel', {
  setup: function() {
    loadDefinitions({
      "User": DS.Model
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  var result = generatedModel("User");
  ok(result);
});
