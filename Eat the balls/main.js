//GLOBAL VARIABLES
//----------------------------------------------------------------------------
const balls = [];
let interval;

//UI ELEMENTS
//----------------------------------------------------------------------------
//selectors
const startBtn = document.getElementById("startBtn");
const canvas = document.querySelector("canvas");
const resetBtn = document.getElementById("resetBtn");
const ballsRemaining = document.getElementById("ballsRemaining");
const timer = document.getElementById("timer");
// setup canvas ------------------------------------------------------
const ctx = canvas.getContext("2d");
let width;
let height;
//start/reset ------------------------------------------------------
resetBtn.style.display = "none";
// START GAME
startBtn.addEventListener("click", () => {
  resetBtn.style.display = "";
  startBtn.style.display = "none";
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  startTimer();
  createBalls(50);
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
  let min = 0;
  interval = setInterval(() => {
    let elapsedTime = (Date.now() - startTime) / 1000;
    if (min < 1) {
      timer.innerHTML = `Timer: ${elapsedTime.toFixed(2)}`;
    } else {
      timer.innerHTML = `Timer: ${min}:${elapsedTime.toFixed(2)}`;
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
}
// ball counter ------------------------------------------------------
function ballCounter() {
  ballsRemaining.textContent = `Balls remaining: ${balls.length}`;
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

//GAME FUNCTIONALITY
//----------------------------------------------------------------------------
function randomNumber(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function randomColor() {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
}

//GAME
//----------------------------------------------------------------------------
function createBalls(nBalls) {
  for (let index = 0; index < nBalls; index++) {
    let radius = randomNumber(10, 20);
    const ball = new Ball(randomNumber(radius, width - radius), randomNumber(radius, height - radius), randomNumber(-10, 10), randomNumber(-10, 10), randomColor(), radius, index);
    balls.push(ball);
  }
}
function gameLoop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  for (ball of balls) {
    ball.draw();
    ball.wallCollision();
    ball.updateMovement();
  }
  requestAnimationFrame(gameLoop);
}
