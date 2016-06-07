import Ember from 'ember';
import DS from 'ember-data';

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

    if (attr.match(/Id$/) && attr_type === 'number') {
      assoc = attr.replace(/Id$/, '');
      properties[assoc] = DS.belongsTo(assoc.capitalize(), {
        async: true
      });
    } else {
      if (!attr.match(/^id$/)) {
        if (typeof defaults[attr] !== "undefined") {
          properties[attr] = DS.attr(attr_type, { defaultValue: defaults[attr] });
        } else {
          properties[attr] = DS.attr(attr_type);
        }
      }
    }
  }
};

let loadAssociations = function(properties, associations) {
  let relationshipName;

  for (let assoc in associations) {
    if (!associations.hasOwnProperty(assoc)) {
      continue;
    }

    let info = associations[assoc];
    assoc = assoc.replace(/_id/, '');

    if (info === null || info === undefined) {
      continue;
    }

    let tableName;
    if ((tableName = info.has_many) ||
        (tableName = info.has_and_belongs_to_many) ||
        (tableName = info.embeds_many)) {
      let relationshipName = Ember.String.dasherize(tableName.replace(/_id/, '').singularize());
      properties[assoc] = DS.hasMany(relationshipName, {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
      /*jshint -W083 */
      properties[assoc + '_not_deleted'] = Ember.computed(assoc + '@each.isDeleted', function() {
        return this.get(assoc).filterBy('isDeleted', false);
      });
      /*jshint +W083 */
    } else if ((tableName = info.belongs_to) ||
               (tableName = info.has_one) ||
               (tableName = info.embedded_in) ||
               (tableName = info.embeds_one)) {
      let relationshipName = Ember.String.dasherize(tableName.replace(/_id/, '').singularize());
      properties[assoc] = DS.belongsTo(relationshipName, {
        async: info.async || true,
        polymorphic: info.polymorphic || false
      });
    } else {
      throw "Relation type binding missing.";
    }
  }
};

let loadDescendants = function(descendants, callback) {
  if (!descendants) {
    return;
  }

  for (let subClassName in descendants) {
    callback(subClassName, descendants[subClassName]);
  }
};

let loadModel = function(className, schema, model, config) {
  let properties = {};

  loadAttributres(properties, schema.attributes, schema.defaults || {});
  loadAssociations(properties, schema.associations);

  config[Ember.String.dasherize(className)] = model.extend(properties);

  loadDescendants(schema.descendants, function(subClassName, subSchema) {
    loadModel(subClassName, subSchema, config[Ember.String.dasherize(className)], config);
  });
};

let loadModels = function(result) {
  let config = {};
  for (let className in result) {
    let schema = result[className];
    className = className.replace("::", "/");
    loadModel(className, schema, DS.Model, config);
  }
  return config;
};

export {
  loadModels,
  loadModel
};
