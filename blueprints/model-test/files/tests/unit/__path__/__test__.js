import { moduleForModel, test } from 'ember-qunit';
import config from '<%= dasherizedPackageName %>/config/environment';
import { loadModelDefinitions } from '<%= dasherizedPackageName %>/utils/model-definitions';

moduleForModel('<%= dasherizedModuleName %>', '<%= friendlyDescription %>', {
  // Specify the other units that are required for this test.
<%= typeof needs !== 'undefined' ? needs : '', %>
  beforeSetup: loadModelDefinitions(config['model-schema'])
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
