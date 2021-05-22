/// <reference path="index.d.ts" />

const gui = require(".").default;

gui.listen();

gui.on("raw", (data) => {
  console.log(data)
});

gui.on("keyboard:keydown", () => {
  console.log(gui.keyboard);
})

gui.on("keyboard:keyup", () => {
  console.log(gui.keyboard);
})