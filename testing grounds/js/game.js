import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }

    draw(context) {
      this.player.draw(context);
    }

    update() {
      this.player.update(this.input.keys);
    }

    toggleHitBoxes(context) {
      this.player.hitBox(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.toggleHitBoxes(ctx);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
  }
  gameLoop();
});
