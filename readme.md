> # Global User Input
> 😎 Bi-directional global user input; Read/Write key events on Windows!

> ### Last Update (2.0.0)
- Added bi-directional support! Now you can control the mouse and keyboard!

> ### Example

```js
const gui = require("globaluserinput").default;
gui.init();

gui.on("keyboard:keydown", ({ key }) => {
  console.log("User pressed to key:", key);
});

gui.on("mouse:move", ({ x, y }) => {
  console.log("User moved the mouse:", x, y);
});

// Click the left mouse button every one second.
setInterval(()=>{
  gui.mouse.click(1);
}, 1000);
```

> ### API

> #### `init(): void`: Initializes the global user input.

> #### `keyboard: Object`
>
> - `isDown(key): boolean`: Key code is required. And it returns `true` if the key is down.
>
> - `down(key): any`: Key code is required. Sends a `keydown` event to the active window/desktop.
>
> - `up(key): any`: Key code is required. Sends a `keyup` event to the active window/desktop.
>
> - `press(key): any`: Key code is required. Sends a `keypress` event to the active window/desktop. Basicly it sends a `keydown` and a `keyup` event.

> #### `mouse: Object`
>
> - `x: number`: X position of the mouse.
>
> - `y: number`: Y position of the mouse.
>
> - `isDown(key): boolean`: Key code is required. And it returns `true` if the key is down.
> 
> - `down(key, x?, y?): any`: Key code is required. Sends a `mousedown` event to the active window/desktop.
>
> - `up(key, x?, y?): any`: Key code is required. Sends a `mouseup` event to the active window/desktop.
>
> - `move(x, y): any`:  X and Y is required. Sends a `mousemove` event to the active window/desktop.
>
> - `click(key, x?, y?): any`: Key code is required. Basicly sends a `mousedown` and a `mouseup` event.
>

> #### `on(event, listener): any`
>
> Shortcut for the `this.events.on()`.
> Also you can listen for these events:
>
> - `mouse:move`: Object
>   - `x: number`: X position of the mouse.
>   - `y: number`: Y position of the mouse.
> - `mouse:keyup`: Object
>   - `x: number`: X position of the mouse.
>   - `y: number`: Y position of the mouse.
>   - `key: number`: Keycode of the key.
> - `mouse:keydown`: Object
>   - `x: number`: X position of the mouse.
>   - `y: number`: Y position of the mouse.
>   - `key: number`: Keycode of the key.
> - `keyboard:keyup`: Object
>   - `key: number`: Keycode of the key.
> - `keyboard:keydown`: Object
>   - `key: number`: Keycode of the key.
> - `keyboard:keypress`: Object
>   - `key: number`: Keycode of the key.

> #### `off(event, listener): any`
>
> Shortcut for the `this.events.off()`.


> #### `events: EventEmitter`
>
> - Node.js event emitter.
