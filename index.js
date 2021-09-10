const GlobalUserInput = require("./GlobalUserInput");
let gui = new GlobalUserInput();

// Deprecated
module.exports = gui;
module.exports.GlobalUserInput = GlobalUserInput;

// New One
module.exports.default = gui;
module.exports.default.GlobalUserInput = GlobalUserInput;

