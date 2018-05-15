import generatedModel from 'uncharted-describe-models/utils/generated-model';
import { loadDefinitions } from 'uncharted-describe-models/utils/model-definitions';
import { module, test } from 'qunit';
import DS from 'ember-data';

module('generatedModel');

// Replace this with your real tests.
test('it works', function(assert) {
  loadDefinitions({
    "User": DS.Model
  });

  var result = generatedModel("User");
  assert.ok(result);
});
