export class Player {
  constructor(game) {
    this.game = game;
    this.width = 39;
    this.height = 39;
    this.x = 0;
    this.y = game.height;
    this.image = player_movement;
    this.sizeRatio = 2;
    console.log(game);
  }

  update(input) {
    if (input.indexOf("d") !== -1 && input.indexOf("a") === -1) {
      this.x++;
    } else if (input.indexOf("a") !== -1 && input.indexOf("d") === -1) {
      this.x--;
    }
  }

  draw(context) {
    // player sprite
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y - this.sizeRatio * this.height, this.sizeRatio * this.width, this.sizeRatio * this.height);
  }

  hitBox(context) {
    // hitbox
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x + this.width, this.y - this.height, this.height * 0.8, 0, 2 * Math.PI);
    context.fill();
  }
}
