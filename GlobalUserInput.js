const cp = require("child_process");
const path = require("path");
const { EventEmitter } = require("events");

class GlobalUserInput extends EventEmitter {

  /** @type {cp.ChildProcessWithoutNullStreams} */
  mainProc;

  constructor() {
    super();

    const ogEmit = this.emit;
    this.emit = (name, ...args) => {
      ogEmit.call(this, "*", { name, args });
      ogEmit.call(this, name, ...args);
    }
  }

  /**
   * Start listening to user events.
   * @param {String} binaryPath File path to UserInputJSON.exe
   */
  async listen(binaryPath = "") {
    this.mainProc = cp.spawn(binaryPath || path.resolve(__dirname, "binary", "UserInputJSON.exe").replace("app.asar", "app.asar.unpacked"));
    this.mainProc.stdout.setEncoding("utf-8");
    let lineBuffer = "";
    this.mainProc.stdout.on("data", (data) => {
      let lines = (lineBuffer + data).split("\n");
      if (data[data.length - 1] != "\n") {
        lineBuffer = lines.pop();
      } else {
        lineBuffer = "";
      }
      for (let i = 0; i < lines.length - 1; i++) {
        let line = lines[i];
        const json = JSON.parse(line);
        this.#handleData(json);
      }
    })
  }

  #handleData = (json = {}) => {
    this.emit(`raw`, json);
    this.emit(`${json.event.base}:${json.event.type}`, json.data)
  }
}

module.exports = GlobalUserInput;