<!-- GLOBAL VARIABLES -->

```js
isGameOver = false / true; //game state playing/over
balls = [ball];
players = [player];
```

<!-- CLASSES -->

```js
class GameActor {
  constructor(x, y, velX, velY)
}
class Ball extends GameActor {
  constructor(x,y,velX,velY,radius,color,)
  draw(draw ball)
  delete(delete ball)
  checkWallCollision(if collides, change direction)
  updatePosition(move ball with velX and velY)
}

```

<!-- PLAYER -->

```js
class Player extends GameActor {
  constructor(x,y,velX,velY,index,movementKeys,radius,color) {
    super(x,y,velY,velX)
    this.index
    this.radius //temporary shape
    this.movementKeys = [{keyValue:false/true}]
    this.color //temporary shape
  }
  draw(draw player)
  delete(delete player)
  checkWallCollision(if collides, stop movement in that direction)
  checkBallCollision(if collides, delete ball)
  updatePosition(if movementKeys[keyValue] true, move)
}


```
