var http = require('http');
var fs = require('fs');
var RSVP = require('rsvp');

module.exports = {
  name: 'update-models',
  description: 'Updates schema.json with the latest from the server',

  availableOptions: [
    { name: 'proxy',  type: String, aliases: ['pr','pxy'] }
  ],

  run: function(commandOptions) { // , rawArgs
    if (commandOptions.proxy) {
      if (!commandOptions.proxy.match(/^(http:|https:)/)) {
        var message = 'You need to include a protocol with the proxy URL.\nTry --proxy http://' + commandOptions.proxy;
        return RSVP.Promise.reject(new SilentError(message));
      }
    }

    var ui = this.ui;

    return new RSVP.Promise(function() { // resolve, reject
      var url = commandOptions.proxy + '/api/v2/describe/models';

      return http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
          body += chunk;
        });

        res.on('end', function() {
          ui.writeLine('Writing out app/schema.json');
          fs.writeFile('app/schema.json', body, { encoding: 'utf8' });
        });
      }).on('error', function(e) {
        ui.writeLine('Download Error: ' + e);
      });
    });
  }
};
