import { test, moduleForModel } from 'ember-qunit'
import config from '<%= dasherizedPackageName %>/config/environment'
import { loadModelDefinitions } from '<%= dasherizedPackageName %>/utils/model-definitions'

moduleForModel '<%= dasherizedModuleName %>', '<%= classifiedModuleName %>', {
  # Specify the other units that are required for this test.
<%= typeof needs !== 'undefined' ? needs : '' %>
  beforeSetup: loadModelDefinitions(config['model-schema'])
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
