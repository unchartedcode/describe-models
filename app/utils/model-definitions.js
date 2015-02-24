var Definitions = {};

var load = function(definitions) {
  for (var key in definitions) {
    if (!definitions.hasOwnProperty(key)) {
      continue;
    }

    Definitions[key] = definitions[key];
  }
};

export default Definitions;
export { load };
