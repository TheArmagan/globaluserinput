const gui = require("./");
gui.listen();

gui.on("keyboard:keydown", ({ key }) => {
  console.log("User pressed to key:", key);
});

gui.on("mouse:move", ({ x, y }) => {
  console.log("User moved the mouse", x, y);
});