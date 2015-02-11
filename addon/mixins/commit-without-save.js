import Ember from 'ember';

export default Ember.Mixin.create({
  // Mark model as saved without actually saving it
  commit: function() {
    this.adapterWillCommit();
    // If inflight is empty, this is a fake save, otherwise its a commit from a failed save
    // On a fake save, we need to mimic how save updates the attributes
    if (Ember.$.isEmptyObject(this._inFlightAttributes)) {
      this._inFlightAttributes = this._attributes;
      this._attributes = {};
    }
    this.adapterDidCommit();
  }
});
