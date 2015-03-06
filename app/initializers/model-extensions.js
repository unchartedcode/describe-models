// import Ember from 'ember';
import DS from 'ember-data';
import CommitWithoutSaveMixin from 'uncharted-describe-models/mixins/commit-without-save';
import BaseUrlsMixin from 'uncharted-describe-models/mixins/base-urls';
import ThenLoadedMixin from 'uncharted-describe-models/mixins/then-loaded';
import RelationshipByIdsMixin from 'uncharted-describe-models/mixins/relationship-by-ids';

export function initialize(/* container, application */) {
  DS.Model.reopen(CommitWithoutSaveMixin,
                  BaseUrlsMixin,
                  ThenLoadedMixin,
                  RelationshipByIdsMixin);
}

export default {
  name: 'uncharted-model-extensions',
  initialize: initialize
};
