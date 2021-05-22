const cp = require("child_process");
const path = require("path");
const { EventEmitter } = require("events");

class GlobalUserInput {

  /** @type {cp.ChildProcessWithoutNullStreams} @private */
  #mainProc;

  /** @type {{[key: number]: boolean, isDown(key:number)=>boolean}} */
  keyboard = {
    isDown(key = 0) {
      return !!this[key];
    }
  };

  /** @type {{x: number, y: number, [key: number]: boolean, isDown(key:number)=>boolean}} */
  mouse = {
    x: 0,
    y: 0,
    isDown(key = 0) {
      return !!this[key];
    }
  }

  events = new EventEmitter();

  /**
   * Start listening to user events.
   * @param {String} binaryPath File path to UserInputJSON.exe
   */
  async listen(binaryPath = "") {
    if (!!this.#mainProc) throw "Already listening..";
    this.#mainProc = cp.spawn(binaryPath || path.resolve(__dirname, "binary", "UserInputJSON.exe").replace("app.asar", "app.asar.unpacked"));
    this.#mainProc.stdout.setEncoding("utf-8");
    let lineBuffer = "";
    this.#mainProc.stdout.on("data", (data) => {
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
    const eventName = `${json.event.base}:${json.event.type}`;
    const eventData = json.data;
    this.events.emit(`raw`, json);
    this.events.emit(eventName, eventData);

    switch (eventName) {
      case "keyboard:keydown":
        this.keyboard[eventData.key] = true;
        break;
      case "keyboard:keyup":
        this.keyboard[eventData.key] = false;
        break;
      case "mouse:move":
        this.mouse.x = eventData.x;
        this.mouse.y = eventData.y;
        break;
      case "mouse:keydown":
        this.mouse[eventData.key] = true;
        break;
      case "mouse:keyup":
        this.mouse[eventData.key] = false;
        break;
    }
  }

  /** 
   * Shortcut for the `this.events.on()`.
   * @type {NodeJS.EventEmitter.on(event: string | symbol, listener: (...args: any[]) => void)}
   */
  on(event, listener) {
    this.events.on(event, listener);
  }

  /**
   * Shortcut for the `this.events.off()`.
   */
  off(event, listener) {
    this.events.off(event, listener)
  }

}

module.exports = GlobalUserInput;