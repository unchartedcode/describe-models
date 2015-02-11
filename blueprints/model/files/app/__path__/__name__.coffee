import DS from 'ember-data'
import GeneratedModel from '../utils/generated-model'

<%= classifiedModuleName %> = GeneratedModel('<%= dasherizedModuleName %>').extend({
  <%= attrs %>
})

export default <%= classifiedModuleName %>
