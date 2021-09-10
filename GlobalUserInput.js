const cp = require("child_process");
const path = require("path");
const { EventEmitter } = require("events");

class GlobalUserInput {

  /** @type {cp.ChildProcessWithoutNullStreams} @private */
  #mainProc;

  #keyboardStates = {};
  #mouseStates = {
    x: 0,
    y: 0
  };

  get keyboard() {
    let self = this;
    return {
      isDown(key) {
        return !!self.#keyboardStates[key];
      },
      down(key) {
        self.#write(JSON.stringify({
          event: {
            base: "keyboard",
            type: "keydown"
          },
          data: {
            key
          }
        }));
      },
      up(key) {
        self.#write(JSON.stringify({
          event: {
            base: "keyboard",
            type: "keyup"
          },
          data: {
            key
          }
        }));
      },
      press(key) {
        self.#write(JSON.stringify({
          event: {
            base: "keyboard",
            type: "keypress"
          },
          data: {
            key
          }
        }));
      }
    }
  };

  get mouse() {
    let self = this;
    return {
      get x() {
        return self.#mouseStates.x;
      },
      get y() {
        return self.#mouseStates.y;
      },
      isDown(key) {
        return !!self.#mouseStates[key];
      },
      down(key, x, y) {
        self.#write(JSON.stringify({
          event: {
            base: "mouse",
            type: "keydown"
          },
          data: {
            x,
            y,
            key
          }
        }));
      },
      up(key, x, y) {
        self.#write(JSON.stringify({
          event: {
            base: "mouse",
            type: "keyup"
          },
          data: {
            x,
            y,
            key
          }
        }));
      },
      move(x, y) {
        self.#write(JSON.stringify({
          event: {
            base: "mouse",
            type: "move"
          },
          data: {
            x,
            y
          }
        }));
      },
      click(key, x, y) {
        this.down(key, x, y);
        this.up(key, x, y);
      }
    }
  }

  events = new EventEmitter();

  /**
   * Start listening to user events.
   * @param {String} binaryPath File path to UserInputJSON.exe
   */
  async init(binaryPath = "") {
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

  #write = (text = "", autoEnter = true) => {
    this.#mainProc.stdin.write(text + (autoEnter ? "\n" : ""), "utf-8");
  }

  #handleData = (json = {}) => {
    const eventName = `${json.event.base}:${json.event.type}`;
    const eventData = json.data;
    this.events.emit(`raw`, json);
    this.events.emit(eventName, eventData);

    switch (eventName) {
      case "keyboard:keydown":
        this.#keyboardStates[eventData.key] = true;
        break;
      case "keyboard:keyup":
        delete this.#keyboardStates[eventData.key];
        break;
      case "mouse:move":
        this.#mouseStates.x = eventData.x;
        this.#mouseStates.y = eventData.y;
        break;
      case "mouse:keydown":
        this.#mouseStates[eventData.key] = true;
        break;
      case "mouse:keyup":
        delete this.#mouseStates[eventData.key];
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