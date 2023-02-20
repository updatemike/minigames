export class InputHandler {
  constructor() {
    this.keys = { w: false, a: false, s: false, d: false, spacebar: false };
    document.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }
}
