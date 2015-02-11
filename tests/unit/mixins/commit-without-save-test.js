import Ember from 'ember';
import CommitWithoutSaveMixin from 'uncharted-describe-models/mixins/commit-without-save';

module('CommitWithoutSaveMixin');

// Replace this with your real tests.
test('it works', function() {
  var CommitWithoutSaveObject = Ember.Object.extend(CommitWithoutSaveMixin);
  var subject = CommitWithoutSaveObject.create();
  ok(subject);
});
