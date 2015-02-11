import Ember from 'ember';
import RelationshipByIdsMixin from 'uncharted-describe-models/mixins/relationship-by-ids';

module('RelationshipByIdsMixin');

// Replace this with your real tests.
test('it works', function() {
  var RelationshipByIdsObject = Ember.Object.extend(RelationshipByIdsMixin);
  var subject = RelationshipByIdsObject.create();
  ok(subject);
});
