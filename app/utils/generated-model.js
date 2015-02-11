import config from '../config/environment';

export default function generatedModel() {
  var classifiedName = Ember.String.classify(config.modulePrefix);
  if (Ember.testing) {
    // Can't easily see a way to plug into the window[classfiedName]
    return DS.Model;
  } else {
    return window[classifiedName].__container__.registry["model:#{name}"] || DS.Model;
  }
}
