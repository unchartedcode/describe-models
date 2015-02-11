import Ember from 'ember';

export default Ember.Mixin.create({
  // returns the belongs to id
  belongsTo: function(relation_name) {
    var relationship = this._relationships[relation_name];

    if (!(relationship && relationship.relationshipMeta.kind === 'belongsTo')) {
      throw new Ember.Error("Model '" + (Ember.inspect(this)) + "' has no belongsTo relationship named '" + relation_name + "' defined.");
    }

    var inverseRecord = Ember.get(relationship, 'inverseRecord');
    return Ember.get(inverseRecord, 'id');
  },

  // returns an array of ids
  hasMany: function(relation_name) {
    var relationship = this._relationships[relation_name];
    if (!(relationship && relationship.relationshipMeta.kind === 'hasMany')) {
      throw new Ember.Error("Model '" + (Ember.inspect(this)) + "' has no hasMany relationship named '" + relation_name + "' defined.");
    }

    var ids = [];
    var members = Ember.get(relationship, 'members');
    members.forEach(function(member) {
      return ids.push(Ember.get(member, 'id'));
    });

    return ids;
  }
});
