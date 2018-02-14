let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;

var ballRadius = 10;

//width and height will be the same for both paddles
let paddleHeight = 10;
let paddleWidth = 5;

let topPaddleRadius = 20;
let topPaddleX = (canvas.width-paddleWidth) / 2;

let bottomPaddleRadius = 20;
let bottomPaddleX = (canvas.width-paddleWidth) / 2;
let bottomPaddleY = canvas.height-(paddleHeight + 20);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function drawTopBound() {
  ctx.beginPath();
  ctx.rect(canvas.width * (1/4), 0, canvas.width / 2, 1);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

function drawBottomBound() {
  ctx.beginPath();
  ctx.rect(canvas.width * (1/4), canvas.height - 1, canvas.width / 2, 1);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

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
  drawTopBound();
  drawTopPaddle();
  drawBall();
  drawBottomPaddle();
  drawBottomBound();
  let bottomPaddleDx = x - bottomPaddleX;
  let bottomPaddleDy = y - bottomPaddleY;
  let bottomPaddleDistance = Math.sqrt(bottomPaddleDx * bottomPaddleDx + bottomPaddleDy * bottomPaddleDy);

  //ball bouncing across left and right walls
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //ball bouncing across top and bottom walls (will need to add special cases later)
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height-ballRadius) {
    if (x < canvas.width / 4 || x > canvas.width * (3 / 4)) {
      dy = -dy;
    } else {
      //reset coordinates to center
      x = canvas.width / 2;
      y = canvas.height / 2;
      dx = -dx;
      dy = -dy;
    }
  }

  //fix circle collision getting stuck
  if (bottomPaddleDistance < ballRadius + bottomPaddleRadius) {
    // debugger;
    dy = -dy;
    dx = -dx;
  }

  //keeps the bottom circle within the boundaries of the table when moving left, right, up, or down
  if (rightPressed && bottomPaddleX < canvas.width-(bottomPaddleRadius + 5)) {
    bottomPaddleX += 7;
  } else if (leftPressed && bottomPaddleX > 25) {
    bottomPaddleX -= 7;
  } else if (downPressed && bottomPaddleY < canvas.height-(bottomPaddleRadius + 5)) {
    bottomPaddleY += 7;
  } else if (upPressed && bottomPaddleY > (canvas.height * (7/10))) {
    bottomPaddleY -= 7;
  }

  //keep the ball moving with the small change
  x += dx;
  y += dy;
}

setInterval(draw, 10);
