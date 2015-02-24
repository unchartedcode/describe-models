import { test } from 'ember-qunit'
import moduleForGeneratedModel from 'uncharted-describe-models/utils/test-models'
import config from '<%= dasherizedPackageName %>/config/environment'
import { loadModels } from 'uncharted-describe-models/utils/load-models'
import { load as loadDefinitions } from '<%= dasherizedPackageName %>/utils/model-definitions'

moduleForGeneratedModel '<%= dasherizedModuleName %>', '<%= classifiedModuleName %>', {
  # Specify the other units that are required for this test.
<%= typeof needs !== 'undefined' ? needs : '' %>
  register: (container) ->
    loadDefinitions(loadModels(config['model-schema']))
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
