import DS from 'ember-data';
import GeneratedModel from '../utils/generated-model';

<%= classifiedModuleName %> = GeneratedModel('<%= dasherizedModuleName %>').reopen({
  <%= attrs %>
})

export default <%= classifiedModuleName %>;
