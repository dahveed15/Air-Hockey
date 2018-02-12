let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
var dx = 2;
var dy = -2;

//width and height will be the same for both paddles
var paddleHeight = 10;
var paddleWidth = 75;
var bottomPaddleX = (canvas.width-paddleWidth) / 2;
var topPaddleX = (canvas.width-paddleWidth) / 2;

//figure out how to split this up into its own paddle file
function drawTopPaddle() {
  ctx.beginPath();
  ctx.rect(topPaddleX, paddleHeight * 2, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBottomPaddle() {
  ctx.beginPath();
  ctx.rect(bottomPaddleX, canvas.height-(paddleHeight + 20), paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

var ballRadius = 10;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawTopPaddle();
  drawBottomPaddle();

  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (rightPressed && bottomPaddleX < canvas.width-paddleWidth) {
    bottomPaddleX += 7;
  } else if (leftPressed && bottomPaddleX > 0) {
    bottomPaddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
