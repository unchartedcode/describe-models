'use strict';

var fs = require('fs');

module.exports = {
  name: require('./package').name,

  config: function(env, config) {
    // Make sure it isn't ember init
    if (env != null) {
      if (!fs.existsSync('app/schema.json')) {
        if (env !== 'test') {
          throw new Error('You must include a schema.json in the root of app/');
        }
      } else {
        var schema = JSON.parse(fs.readFileSync('app/schema.json', 'utf8'));
        config['model-schema'] = schema;
      }
    }
    return config;
  },

  includedCommands: function() {
    return {
      'update-models': require('./lib/commands/update-models')
    };
  }
};
