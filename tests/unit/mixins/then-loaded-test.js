import Ember from 'ember';
import ThenLoadedMixin from 'uncharted-describe-models/mixins/then-loaded';

module('ThenLoadedMixin');

// Replace this with your real tests.
test('it works', function() {
  var ThenLoadedObject = Ember.Object.extend(ThenLoadedMixin);
  var subject = ThenLoadedObject.create();
  ok(subject);
});
