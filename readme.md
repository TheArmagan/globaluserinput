# Global User Input

Windows only. <sub>(for now)</sub>

> ### Last Update (1.1.1)
- Added types! So now you can auto completions when coding!
- Not using `default` export is deprecated!
- Shortcut added for the `this.events.off()`! Now you can just do `off(eventName, listener)`

> ### Example

```js
const gui = require("globaluserinput").default;
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
