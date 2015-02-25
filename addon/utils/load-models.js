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

var loadModel = function(className, schema, model, config) {
  var assoc;
  var attr;
  var info;
  var properties = {};
  var subClassName;
  var subSchema;
  var tableName;
  var type;
  var underscoredAttr;
  var schemaAttributes, schemaAssociations, schemaDescendants;

  schemaAttributes = schema.attributes;
  for (underscoredAttr in schemaAttributes) {
    type = schemaAttributes[underscoredAttr];
    attr = underscoredAttr;
    if (dsTypes[type] != null) {
      if (attr.match(/Id$/) && dsTypes[type] === 'number') {
        assoc = attr.replace(/Id$/, '');
        properties[assoc] = DS.belongsTo(assoc.capitalize());
      } else {
        if (!attr.match(/^id$/)) {
          properties[attr] = DS.attr(dsTypes[type]);
        }
      }
    } else {
      Ember.Logger.warn("ERROR: Unknown type '" + type + "' for dsType in parser.js");
      properties[attr] = Ember.required();
    }
  }

  schemaAssociations = schema.associations;
  for (assoc in schemaAssociations) {
    info = schemaAssociations[assoc];
    assoc = assoc.replace(/_id/, '');
    if (tableName = (info != null ? info.has_many : void 0) || (tableName = (info != null ? info.has_and_belongs_to_many : void 0) || (tableName = info != null ? info.embeds_many : void 0))) {
      properties[assoc] = DS.hasMany(Ember.String.dasherize(tableName.replace(/_id/, '').singularize()), {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
    } else if (tableName = (info != null ? info.belongs_to : void 0) || (tableName = (info != null ? info.has_one : void 0) || (tableName = (info != null ? info.embedded_in : void 0) || (tableName = info != null ? info.embeds_one : void 0)))) {
      properties[assoc] = DS.belongsTo(Ember.String.dasherize(tableName.replace(/_id/, '').singularize()), {
        async: info.async || false,
        polymorphic: info.polymorphic || false
      });
    } else if (info) {
      throw "Relation type binding missing.";
    }
  }

  config[Ember.String.dasherize(className)] = model.extend(properties);

  if (schema.descendants) {
    schemaDescendants = schema.descendants;
    for (subClassName in schemaDescendants) {
      subSchema = schemaDescendants[subClassName];
      loadModel(subClassName, subSchema, config[Ember.String.dasherize(className)], config);
    }
  }
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
