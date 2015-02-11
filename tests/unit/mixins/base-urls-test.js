import Ember from 'ember';
import BaseUrlsMixin from 'uncharted-describe-models/mixins/base-urls';

module('BaseUrlsMixin');

// Replace this with your real tests.
test('it works', function() {
  var BaseUrlsObject = Ember.Object.extend(BaseUrlsMixin);
  var subject = BaseUrlsObject.create();
  ok(subject);
});
