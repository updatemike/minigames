export class InputHandler {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      if ((e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "space") && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (this.keys.indexOf(e.key) !== -1) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
