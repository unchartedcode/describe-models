import Ember from 'ember';

export default Ember.Mixin.create({
  // Callback to return a promise for when the data is loaded
  thenLoaded: function(onLoaded) {
    return new Ember.RSVP.Promise((function(_this) {
      return function(resolve) {
        if (_this.get("isLoaded")) {
          return resolve(_this);
        } else {
          return _this.one("didLoad", function() {
            return resolve(this);
          });
        }
      };
    })(this)).then(onLoaded);
  }
});
