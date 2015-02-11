import Ember from 'ember';

export default Ember.Mixin.create({
  baseApi: function() {
    var adapter = this.store.adapterFor(this.constructor);
    return adapter.buildURL();
  },

  baseUrl: function() {
    var adapter = this.store.adapterFor(this.constructor);
    var url = adapter.buildURL(this.constructor.typeKey);
    var index = url.indexOf("?");

    if (index >= 0) {
      return url.substr(0, index);
    }

    return url;
  }
});
