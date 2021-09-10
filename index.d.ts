

declare module "globaluserinput" {
  import { ChildProcessWithoutNullStreams } from "child_process";
  import { EventEmitter } from "events";
  
  export class GlobalUserInput {

    #mainProc: ChildProcessWithoutNullStreams;

    public keyboard: {
      isDown(key: number): boolean;
      down(key: number): any;
      up(key: number): any;
      press(key: number): any;
    }

    public mouse: {
      x: number;
      y: number;
      isDown(key: number): boolean;
      down(key: 1 | 2 | 3): any;
      up(key: 1 | 2 | 3): any;
      move(x: number, y: number): any;
      click(key: 1 | 2 | 3): any;
    }

    public events: EventEmitter;

    public init(binaryPath?: string): Promise<any>;

    #handleData: (json: any) => any;

    public on(event: "mouse:move", listener: (data: { x: number, y: number }) => void): any;
    public on(event: "mouse:keyup", listener: (data: { x: number, y: number, key: number }) => void): any;
    public on(event: "mouse:keydown", listener: (data: { x: number, y: number, key: number }) => void): any;
    public on(event: "keyboard:keyup", listener: (data: { key: number }) => void): any;
    public on(event: "keyboard:keydown", listener: (data: { key: number }) => void): any;
    public on(event: "keyboard:keypress", listener: (data: { key: number }) => void): any;
    public on(event: "raw", listener: (data: { event: { base: string, type: string }, data: { x?: number, y?: number, key?: number } }) => void);

    public off(event: "mouse:move" | "mouse:keyup" | "mouse:keydown" | "keyboard:keyup" | "keyboard:keydown" | "keyboard:keypress" | "raw", listener: (...args: any[]) => void): any;
  }

  const gui: GlobalUserInput;
  export default gui;
}