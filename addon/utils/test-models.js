import { TestModuleForModel } from 'ember-test-helpers';
import isolatedContainer from 'ember-test-helpers/isolated-container';
import { getResolver } from 'ember-test-helpers/test-resolver';
import { createModule } from 'ember-qunit/qunit-module';
import Ember from 'ember';

var Module = TestModuleForModel.extend({
  setupContainer: function() {
    var container = isolatedContainer([]);
    var resolver = getResolver();
    var callbacks = this.callbacks;
    var fullNames = this.needs;

    if (callbacks.register) {
      callbacks.register(container);
    }

    for (var i = fullNames.length; i > 0; i--) {
      var fullName = fullNames[i - 1];
      var normalizedFullName = resolver.normalize(fullName);
      container.register(fullName, resolver.resolve(normalizedFullName));
    }

    this.container = container;
  }
});

export default function moduleForGeneratedModel(name, description, callbacks) {
  createModule(Module, name, description, callbacks);
}
