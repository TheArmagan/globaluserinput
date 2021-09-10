/** @type {import("globaluserinput").GlobalUserInput} */
const gui = require(".").default;

gui.init();

gui.on("raw", (data) => {
  console.log(data)
});

setInterval(() => {
  gui.mouse.click(1);
}, 1000);


