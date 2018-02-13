let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height/2;
var dx = 2;
var dy = -2;

//width and height will be the same for both paddles
var paddleHeight = 10;
var paddleWidth = 5;
var bottomPaddleRadius = 20;
var topPaddleRadius = 20;
var bottomPaddleX = (canvas.width-paddleWidth) / 2;
var topPaddleX = (canvas.width-paddleWidth) / 2;
var bottomPaddleY = canvas.height-(paddleHeight + 20);

//figure out how to split this up into its own paddle file
function drawTopPaddle() {
  ctx.beginPath();
  ctx.arc(topPaddleX, paddleHeight + 20, topPaddleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#cc0000";
  ctx.fill();
  ctx.closePath();
}

function drawBottomPaddle() {
  ctx.beginPath();
  ctx.arc(bottomPaddleX, bottomPaddleY, bottomPaddleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#cc0000";
  ctx.fill();
  ctx.closePath();
}

var ballRadius = 10;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
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

  //ball bouncing across left and right walls
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //ball bouncing across top and bottom walls (will need to add special cases later)
  if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  //keeps the bottom circle within the boundaries of the table when moving left, right, up, or down
  if (rightPressed && bottomPaddleX < canvas.width-(bottomPaddleRadius + 5)) {
    bottomPaddleX += 7;
  } else if (leftPressed && bottomPaddleX > 25) {
    bottomPaddleX -= 7;
  } else if (downPressed && bottomPaddleY < canvas.height-(bottomPaddleRadius + 5)) {
    bottomPaddleY += 7;
  } else if (upPressed && bottomPaddleY > (canvas.height * (2/3))) {
    bottomPaddleY -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
