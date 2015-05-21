// import Ember from 'ember';
import DS from 'ember-data';
import CommitWithoutSaveMixin from 'uncharted-describe-models/mixins/commit-without-save';
import BaseUrlsMixin from 'uncharted-describe-models/mixins/base-urls';
import ThenLoadedMixin from 'uncharted-describe-models/mixins/then-loaded';

export function initialize(/* container, application */) {
  DS.Model.reopen(CommitWithoutSaveMixin,
                  BaseUrlsMixin,
                  ThenLoadedMixin);
}

export default {
  name: 'uncharted-model-extensions',
  initialize: initialize
};
