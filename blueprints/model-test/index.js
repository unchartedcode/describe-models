module.exports = {
  description: 'Generates a model unit test.',

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        return 'models';
      },
      __name__: function(options) {
        return options.dasherizedModuleName;
      },
      __test__: function(options) {
        return options.dasherizedModuleName + '-test';
      }
    };
  }
};
