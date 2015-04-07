import Ember from 'ember';
import DS from 'ember-data';

var dsTypes = {
  string:             'string',
  text:               'string',
  "null":             'string',
  boolean:            'boolean',
  'mongoid::boolean': 'boolean',
  decimal:            'number',
  integer:            'number',
  number:             'number',
  money:              'number',
  date:               'date',
  datetime:           'date',
  'iso.date':         'iso.date',
  object:             'object',
  json:               'object',
  hstore:             'object',
  array:              'array'
};

var loadAttributres = function(properties, attributes) {
  var type;
  var attr;
  var assoc;
  var attr_type;

  for (var underscoredAttr in attributes) {
    if (!attributes.hasOwnProperty(underscoredAttr)) {
      continue;
    }

    type = attributes[underscoredAttr];
    attr = underscoredAttr;
    attr_type = dsTypes[type] != null ? dsTypes[type] : type;

    if (attr.match(/Id$/) && attr_type === 'number') {
      assoc = attr.replace(/Id$/, '');
      properties[assoc] = DS.belongsTo(assoc.capitalize());
    } else {
      if (!attr.match(/^id$/)) {
        properties[attr] = DS.attr(attr_type);
      }
    }
  }
};

var loadAssociations = function(properties, associations) {
  var tableName;
  var relationshipName;

  for (var assoc in associations) {
    if (!associations.hasOwnProperty(assoc)) {
      continue;
    }

    var info = associations[assoc];
    assoc = assoc.replace(/_id/, '');

    if (info === null || info === undefined) {
      continue;
    }

    if ((tableName = info.has_many) ||
        (tableName = info.has_and_belongs_to_many) ||
        (tableName = info.embeds_many)) {
      relationshipName = Ember.String.dasherize(tableName.replace(/_id/, '').singularize());
      properties[assoc] = DS.hasMany(relationshipName, {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
    } else if ((tableName = info.belongs_to) ||
               (tableName = info.has_one) ||
               (tableName = info.embedded_in) ||
               (tableName = info.embeds_one)) {
      relationshipName = Ember.String.dasherize(tableName.replace(/_id/, '').singularize());
      properties[assoc] = DS.belongsTo(relationshipName, {
        async: info.async || false,
        polymorphic: info.polymorphic || false
      });
    } else {
      throw "Relation type binding missing.";
    }
  }
};

var loadDescendants = function(descendants, callback) {
  if (!descendants) {
    return;
  }

  for (var subClassName in descendants) {
    callback(subClassName, descendants[subClassName]);
  }
};

var loadModel = function(className, schema, model, config) {
  var properties = {};

  loadAttributres(properties, schema.attributes);
  loadAssociations(properties, schema.associations);

  config[Ember.String.dasherize(className)] = model.extend(properties);

  loadDescendants(schema.descendants, function(subClassName, subSchema) {
    loadModel(subClassName, subSchema, config[Ember.String.dasherize(className)], config);
  });
};

var loadModels = function(result) {
  var className, schema, config = {};
  for (className in result) {
    schema = result[className];
    className = className.replace("::", "");
    loadModel(className, schema, DS.Model, config);
  }
  return config;
};

export {
  loadModels,
  loadModel
};
