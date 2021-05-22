/// <reference path="index.d.ts" />

const gui = require(".");

gui.listen();

gui.on("raw", (data) => {
  console.log(data)
});