const globalUserInput = require("./");
globalUserInput.on("*", data => {
  console.log(data)
})
globalUserInput.listen();