const globalUserInput = require("./");
const util = require("util");
globalUserInput.on("raw", data => {
  console.log(util.inspect(data, false, 4, true), "\n")
})
globalUserInput.listen();