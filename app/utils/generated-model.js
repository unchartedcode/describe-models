import config from '../config/environment';

export default function generatedModel(name) {
  var classifiedName = Ember.String.classify(config.modulePrefix);
  if (window[classifiedName] &&
     window[classifiedName].__container__ &&
     window[classifiedName].__container__.registry &&
     window[classifiedName].__container__.registry["model:"+name]) {
    return window[classifiedName].__container__.registry["model:"+name] || DS.Model;
  } else {
    return DS.Model;
  }
}
