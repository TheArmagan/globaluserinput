# Global User Input

Windows only. <sub>(for now)</sub>

> ### Example

```js
const gui = require("globaluserinput");
gui.listen();

gui.events.on("keyboard:keydown", ({ key }) => {
  console.log("User pressed to key:", key);
});

gui.events.on("mouse:move", ({ x, y }) => {
  console.log("User moved the mouse", x, y);
});
```

> ### API

> #### `listen(binaryPath?): void`
>
> - Binary path is not required.

> #### `keyboard: Object`
>
> - `isDown(key): boolean`
> - Key is required and function is returns the is key down or not.
> - Also object contains the key states.

> #### `mouse: Object`
>
> - `x: number`: X position of the mouse.
>
> - `y: number`: Y position of the mouse.
>
> - `isDown(key): boolean`
>   - Key is required and function is returns the is key down or not.
> - Also object contains the key states.

> #### `on(): any`
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

> #### `events: EventEmitter`
>
> - Node.js event emitter.
