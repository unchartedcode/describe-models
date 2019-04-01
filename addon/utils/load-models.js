import { isBlank } from '@ember/utils';
import { dasherize } from '@ember/string';
import DS from 'ember-data';
import { singularize } from 'ember-inflector';

const dsTypes = {
  string:             'string',
  boolean:            'boolean',
  decimal:            'number',
  integer:            'number',
  date:               'date',
  datetime:           'date',
  object:             'object',
  jsonb:              'object',
  array:              'array'
  // Not used at the moment
  // text:               'string',
  // 'null':             'string',
  // number:             'number',
  // money:              'number',
  // time:               'date',
  // json:               'object',
  // hstore:             'object',
};

const loadAttributres = function(properties, attributes, _options) {
  for (let underscoredAttr in attributes) {
    if (!attributes.hasOwnProperty(underscoredAttr)) {
      continue;
    }

    let type = attributes[underscoredAttr]['type'];
    delete attributes[underscoredAttr]['type'];
    let attr = underscoredAttr;
    let attr_type = dsTypes[type] != null ? dsTypes[type] : type;
    if (dsTypes[type] == null) {
      console.warn(`The type '${type}' was not found in dsTypes`);
    }

    if (!attr.match(/^id$/)) {
      if (attributes[underscoredAttr] != null && attributes[underscoredAttr]['defaultValue'] != null) {
        let defaultValue = attributes[underscoredAttr]['defaultValue'];
        if (typeof defaultValue === 'object') {
          attributes[underscoredAttr]['defaultValue'] = function() { return defaultValue; };
        }
      }
      properties[attr] = DS.attr(attr_type, attributes[underscoredAttr]);
    }
  }
};

const cleanTableName = function(tableName) {
  // if (tableName.indexOf('/') === 0) {
  //   tableName = tableName.substr(1);
  // }
  return singularize(dasherize(tableName.replace(/_id/, '')));
};

const loadAssociations = function(properties, associations, options) {
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
      let relationshipName = cleanTableName(tableName);

      // If the association is in the skip list, don't create it.
      if (options.skip.indexOf(relationshipName) >= 0) {
        continue;
      }

      let data = {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      };

      if (info.hasOwnProperty('inverse')) {
        data.inverse = info.inverse;
      }

      properties[assoc] = DS.hasMany(relationshipName, data);
    } else if ((tableName = info.belongs_to) ||
               (tableName = info.has_one) ||
               (tableName = info.embedded_in) ||
               (tableName = info.embeds_one)) {
      let relationshipName = cleanTableName(tableName);

      // If the association is in the skip list, don't create it.
      if (options.skip.indexOf(relationshipName) >= 0) {
        continue;
      }

      let data = {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      };

      if (info.hasOwnProperty('inverse')) {
        data.inverse = info.inverse;
      }

      properties[assoc] = DS.belongsTo(relationshipName, data);
    } else {
      throw "Relation type binding missing.";
    }
  }
};

const loadModel = function(modelName, schema, options, config) {
  let properties = {};

  // If the environment skip name is there, return
  if (options.skip.indexOf(modelName) >= 0) {
    return;
  }

  loadAttributres(properties, schema.attributes, options);
  loadAssociations(properties, schema.associations, options);

  config[modelName] = DS.Model.extend(properties);
};

const convertModelName = function(modelName) {
  modelName = modelName.replace("::", "-");
  modelName = dasherize(modelName);
  return modelName;
};

const loadModels = function(modelNames, options) {
  if (isBlank(options)) {
    options = {};
  }
  if (isBlank(options.skip)) {
    options.skip = [];
  }

  let config = {};
  for (let modelName in modelNames) {
    let schema = modelNames[modelName];
    modelName = convertModelName(modelName);
    loadModel(modelName, schema, options, config);
  }
  return config;
};

export {
  loadModels,
  loadModel
};
