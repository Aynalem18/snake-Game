// alert("my js is connected");
// const canvas = document.querySelector(".canvas");
// const ctx = canvas.getContext("2d");
// console.log(ctx);
// // let divided our scanvas in to 20 by 20 small squares
// const scale = 20;
// const rows = canvas.height / scale;
// const columes = canvas.width / scale;

// // now we mneed an array to save the bodies of our snake
// let snake = [];
// snake[0] = {
//   a: Math.floor(Math.random() * columes) * scale,
//   b: Math.floor(Math.random() * columes) * scale,
// };
// let food = {
//   a: Math.floor(Math.random() * columes) * scale,
//   b: Math.floor(Math.random() * rows) * scale,
// };
// // console.log(snake);
// // control the snake direction
// let d = "up";
// document.onkeydown = direction;

// function direction(event) {
//   let key = event.keyCode;
//   if (key == 37 && d != "right") {
//     d = "left";
//   } else if (key == 38 && d != "down") {
//     d = "up";
//   } else if (key == 39 && d != "left") {
//     d = "right";
//   } else if (key == 40 && d != "up") {
//     d = "down";
//   }
// }
// // call our draw function every 100 ms
// let playGame = setInterval(draw, 100);

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < snake.length; i++) {
//     ctx.fillStyle = "#fff";
//     ctx.strokeStyle = "red";
//     ctx.fillRect(snake[i].a, snake[i].b, scale, scale);
//     ctx.strokeRect(snake[i].a, snake[i].b, scale, scale);
//   };
// //   draw food
// ctx.fillStyle = "#ff0";
// ctx.strokeStyle = "green";
// ctx.fillRect(food.a, food.b, scale, scale);
// ctx.strokeRect(food.a, food.b, scale, scale);

//   // old head position
//   let snakeA = snake[0].a;
//   let snakeB = snake[0].b;
//   // console.log(snakeA);
//   // which direction
//   if (d == "left") snakeA -= scale;
//   if (d == "up") snakeB -= scale;
//   if (d == "right") snakeA += scale;
//   if (d == "down") snakeB += scale;
//   if (snakeA > canvas.width) {
//     snakeA = 0;
//   }
//   if (snakeB > canvas.height) {
//     snakeB = 0;
//   }
//   if (snakeA < 0) {
//     snakeA = canvas.width;
//   }
//   if (snakeB < 0) {
//     snakeB = canvas.height;
//   }

//   let newHead = {
//     a: snakeA,
//     b: snakeB,
//   };
//   if (snakeA == food.a && snakeB == food.b) {
//     food = {
//       a: Math.floor(Math.random() * columes) * scale,
//       b: Math.floor(Math.random() * rows) * scale,
//     };
//     // we don't remove the tail
//   } else {
//     // remove the tail
//     snake.pop();
//   }
//   snake.unshift(newHead);
//   //   console.log(snake);
// }
// // check if snake is eating itself
// function eatSelf(head,array){
//   for(let i = 0; i < array.length; i++){
//       if(head.a == array[i].a && head.b == array[i].b){
//           return true;
//       }
//   }
//   return false;
// }
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
// how fare we move
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];


window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

  snake.unshift(head);
  //if food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}

