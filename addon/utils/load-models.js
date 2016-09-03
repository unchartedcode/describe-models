import Ember from 'ember';
import DS from 'ember-data';
import { singularize } from 'ember-inflector';

let dsTypes = {
  string:             'string',
  text:               'string',
  "null":             'string',
  boolean:            'boolean',
  decimal:            'number',
  integer:            'number',
  number:             'number',
  money:              'number',
  date:               'date',
  datetime:           'date',
  time:               'date',
  'iso.date':         'iso.date',
  object:             'object',
  json:               'object',
  hstore:             'object',
  array:              'array'
};

let loadAttributres = function(properties, attributes, defaults) {
  for (let underscoredAttr in attributes) {
    if (!attributes.hasOwnProperty(underscoredAttr)) {
      continue;
    }

    let type = attributes[underscoredAttr];
    let attr = underscoredAttr;
    let attr_type = dsTypes[type] != null ? dsTypes[type] : type;

    if (!attr.match(/^id$/)) {
      if (typeof defaults[attr] !== "undefined") {
        properties[attr] = DS.attr(attr_type, { defaultValue: defaults[attr] });
      } else {
        properties[attr] = DS.attr(attr_type);
      }
    }
  }
};

let loadAssociations = function(properties, associations, options) {
  let relationshipName;

  for (let assoc in associations) {
    if (!associations.hasOwnProperty(assoc)) {
      continue;
    }

    let info = associations[assoc];
    assoc = assoc.replace(/_id/, '');

    if (info == null) {
      continue;
    }

    let tableName;
    if ((tableName = info.has_many) ||
        (tableName = info.has_and_belongs_to_many) ||
        (tableName = info.embeds_many)) {
      let relationshipName = singularize(Ember.String.dasherize(tableName.replace(/_id/, '')));

      // If the association is in the skip list, don't create it.
      if (options.skip.indexOf(relationshipName) >= 0) {
        continue;
      }

      properties[assoc] = DS.hasMany(relationshipName, {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
    } else if ((tableName = info.belongs_to) ||
               (tableName = info.has_one) ||
               (tableName = info.embedded_in) ||
               (tableName = info.embeds_one)) {
      let relationshipName = singularize(Ember.String.dasherize(tableName.replace(/_id/, '')));

      // If the association is in the skip list, don't create it.
      if (options.skip.indexOf(relationshipName) >= 0) {
        continue;
      }

      properties[assoc] = DS.belongsTo(relationshipName, {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
    } else {
      throw "Relation type binding missing.";
    }
  }
};

// let loadDescendants = function(descendants, callback) {
//   if (Ember.isBlank(descendants)) {
//     return;
//   }

//   for (let subClassName in descendants) {
//     callback(subClassName, descendants[subClassName]);
//   }
// };

let loadModel = function(modelName, schema, options, model, config) {
  let properties = {};

  // If the environment skip name is there, return
  if (options.skip.indexOf(modelName) >= 0) {
    return;
  }

  loadAttributres(properties, schema.attributes, schema.defaults || {});
  loadAssociations(properties, schema.associations, options);

  config[modelName] = model.extend(properties);

  // loadDescendants(schema.descendants, function(subModelName, subSchema) {
  //   subModelName = convertModelName(subModelName);
  //   loadModel(subModelName, subSchema, options, config[modelName], config);
  // });
};

let convertModelName = function(modelName) {
  modelName = modelName.replace("::", "/");
  modelName = Ember.String.dasherize(modelName);
  return modelName;
};

let loadModels = function(modelNames, options) {
  if (Ember.isBlank(options)) {
    options = {};
  }
  if (Ember.isBlank(options.skip)) {
    options.skip = [];
  }

  let config = {};
  for (let modelName in modelNames) {
    let schema = modelNames[modelName];
    modelName = convertModelName(modelName);
    loadModel(modelName, schema, options, DS.Model, config);
  }
  return config;
};

export {
  loadModels,
  loadModel
};
