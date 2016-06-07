import generatedModel from '../../../utils/generated-model';
import { loadDefinitions } from '../../../utils/model-definitions';
import { module, test } from 'qunit';

module('generatedModel', {
  setup: function() {
    loadDefinitions({
      "User": DS.Model
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  var result = generatedModel("User");
  assert.ok(result);
});
