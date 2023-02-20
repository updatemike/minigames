export class Player {
  constructor(game) {
    this.game = game;
    this.width = 39;
    this.height = 39;
    this.x = 0;
    this.y = game.height;
    this.image = player_movement;
    this.sizeRatio = 2;
    //horizontal movement
    this.maxSpeed = 7;
    this.speed = 0;
    //vertical movement
    this.maxJumpSpeed = 20;
    this.jumpSpeed = 0;
  }

  update(input) {
    //horizontal speed
    if (input.d === true && input.a === false) this.speed = this.maxSpeed;
    else if (input.a === true && input.d === false) this.speed = -this.maxSpeed;
    else if (this.speed > 0.0001 || this.speed < 0.0001) this.speed *= 0.8;
    else this.speed = 0;

    if (this.onGround() && input.w === true) {
      this.jumpSpeed = -this.maxJumpSpeed;
      input.w = false;
    } else if (this.y < this.game.height) {
      this.jumpSpeed += 1;
    } else {
      this.jumpSpeed = 0;
    }
    this.x += this.speed;
    this.y += this.jumpSpeed;
  }

  draw(context) {
    // player sprite
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y - this.sizeRatio * this.height, this.sizeRatio * this.width, this.sizeRatio * this.height);
  }

  hitBox(context) {
    // hitBox
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x + this.width, this.y - this.height, this.height * 0.8, 0, 2 * Math.PI);
    context.fill();
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
