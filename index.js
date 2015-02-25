/* jshint node: true */
'use strict';

var fs = require('fs');

module.exports = {
  name: 'uncharted-describe-models',

  config: function(env, config) {
    if (env === 'test') {
      return;
    }

    if (!fs.existsSync('app/schema.json')) {
      throw new Error('You must include a schema.json in the root of app/');
    }

    var schema = JSON.parse(fs.readFileSync('app/schema.json', 'utf8'));
    config['model-schema'] = schema;
    return config;
  },

  includedCommands: function() {
    return {
      'update-models': require('./lib/commands/update-models')
    }
  }
};
