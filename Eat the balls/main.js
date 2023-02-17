//GLOBAL VARIABLES
//----------------------------------------------------------------------------
//game characters
const balls = [];
const players = [];
//game timer
let interval;
let min;
let elapsedTime;
//movement
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

//HTML ELEMENTS
//----------------------------------------------------------------------------
//selectors
const startBtn = document.getElementById("startBtn");
const canvas = document.querySelector("canvas");
const resetBtn = document.getElementById("resetBtn");
const ballsRemaining = document.getElementById("ballsRemaining");
const timer = document.getElementById("timer");
const maxBalls = 2;
//setup canvas ------------------------------------------------------
const ctx = canvas.getContext("2d");
let width;
let height;
//start/reset ------------------------------------------------------
resetBtn.style.display = "none";
//START GAME
startBtn.addEventListener("click", () => {
  resetBtn.style.display = "";
  startBtn.style.display = "none";
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  startTimer();
  createBalls(maxBalls);
  createPlayer(width / 2, height / 2, 8, 20, 1);
  ballCounter();
  gameLoop();
});
//RESET GAME
resetBtn.addEventListener("click", () => {
  location.reload();
});
//timer ------------------------------------------------------
function startTimer() {
  let startTime = Date.now();
  min = 0;
  interval = setInterval(() => {
    elapsedTime = (Date.now() - startTime) / 1000;
    if (min < 1) {
      timer.innerHTML = `Timer: ${elapsedTime.toFixed(2)}`;
    } else {
      timer.innerHTML = `Timer: ${min}.${elapsedTime.toFixed(2)}`;
    }
    if (elapsedTime >= 60) {
      min++;
      elapsedTime = 0;
      startTime = Date.now();
    }
  }, 10);
}
function stopTimer() {
  clearInterval(interval);
  if (min > 1) {
    timer.innerHTML = `Completed in: ${min} minutes, ${elapsedTime.toFixed(2)} seconds.`;
  } else if (min === 1) {
    timer.innerHTML = `Completed in: ${min} minute, ${elapsedTime.toFixed(2)} seconds.`;
  } else timer.innerHTML = `Completed in: ${elapsedTime.toFixed(2)} seconds.`;
}
//ball counter ------------------------------------------------------
function ballCounter() {
  ballsRemaining.textContent = `Balls remaining: ${balls.length}`;
}
function ballCounterEnd() {
  ballsRemaining.textContent = `All enemy balls destroyed!`;
}

//CLASSES
//----------------------------------------------------------------------------
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}
class Ball extends Shape {
  //constructor
  constructor(x, y, velX, velY, color, radius, index) {
    super(x, y, velX, velY);
    this.color = color;
    this.radius = radius;
    this.index = index;
  }
  //methods
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  wallCollision() {
    if (this.x + this.radius >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.radius <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.radius >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.radius <= 0) {
      this.velY = -this.velY;
    }
  }
  updateMovement() {
    this.x += this.velX;
    this.y += this.velY;
  }
  delete() {
    balls.splice(this.index, 1);
    balls.forEach((ball) => {
      if (ball.index > this.index) {
        ball.index = ball.index - 1;
      }
    });
    ballCounter();
  }
}
class Player extends Shape {
  //constructor
  constructor(x, y, velocityX, velocityY, color, radius, playerNumber) {
    super(x, y, velocityX, velocityY);
    this.color = color;
    this.radius = radius;
    this.playerNumber = playerNumber;
  }
  //methods
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
  }
  eatBall() {
    for (const ball of balls) {
      const xd = this.x - ball.x;
      const xy = this.y - ball.y;
      const distance = Math.sqrt(xd * xd + xy * xy);
      if (distance < this.radius + ball.radius) {
        ball.delete();
        ballCounter();
      }
    }
  }
  movePlayer() {
    if (balls.length > 0) {
      if (keys.w) {
        if (this.y - this.radius < 0) {
          this.y = this.radius;
        } else this.y -= this.velY;
      }
      if (keys.s)
        if (this.y + this.radius > canvas.height) {
          this.y = canvas.height - this.radius;
        } else this.y += this.velY;
      if (keys.a)
        if (this.x - this.radius < 0) {
          this.x = this.radius;
        } else this.x -= this.velX;
      if (keys.d)
        if (this.x + this.radius > canvas.width) {
          this.x = canvas.width - this.radius;
        } else this.x += this.velX;
    }
  }
}

//GAME FUNCTIONALITY
//----------------------------------------------------------------------------
//calculations
function randomNumber(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function randomColor() {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
}
//player movement
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  movement(e);
});
window.addEventListener("keyup", (e) => {
  movement(e);
});
function movement(e) {
  if (keys[e.key] !== undefined) {
    keys[e.key] = e.type === "keydown";
  }
}

//GAME
//----------------------------------------------------------------------------
function createBalls(maxBalls) {
  for (let index = 0; index < maxBalls; index++) {
    let radius = randomNumber(10, 20);
    const ball = new Ball(
      randomNumber(radius, width - radius),
      randomNumber(radius, height - radius),
      randomNumber(-10, 10),
      randomNumber(-10, 10),
      randomColor(),
      radius,
      index
    );
    balls.push(ball);
  }
}
function createPlayer(x, y, velocity, radius, playerNumber) {
  const player = new Player(x, y, velocity, velocity, "black", radius, playerNumber);
  players.push(player);
}
function gameLoop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  for (ball of balls) {
    ball.draw();
    ball.wallCollision();
    ball.updateMovement();
  }
  for (player of players) {
    player.draw();
    player.movePlayer();
    player.eatBall();
  }
  if (balls.length < 1) {
    stopTimer();
    ballCounterEnd();
  }
  if (balls.length > 0) {
    requestAnimationFrame(gameLoop);
  }
}
