let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let nextRound = false;
let buttonTag = document.getElementById('start-game');
buttonTag.addEventListener('click', () => {
  if (nextRound) {
    nextRound = false;
    buttonTag.value = "Start Game";
  } else {
    nextRound = true;
    buttonTag.value = "Pause Game";
  }
});

let allowCollision = true;
let collisionCounter = 0;

let Player1Score = 0;
let Player2Score = 0;
let tag = document.getElementById('player1-score');
tag.innerHTML = Player1Score;
let tag2 = document.getElementById('player2-score');
tag2.innerHTML = Player2Score;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;

let ballRadius = 10;


//width and height will be the same for both paddles
let paddleHeight = 10;
let paddleWidth = 5;

let topPaddleRadius = 20;
let topPaddleX = (canvas.width-paddleWidth) / 2;
let topPaddleY = paddleHeight + 20;

let bottomPaddleRadius = 20;
let bottomPaddleX = (canvas.width-paddleWidth) / 2;
let bottomPaddleY = canvas.height-(paddleHeight + 20);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

function drawTopBound() {
  ctx.beginPath();
  ctx.rect(canvas.width * (1/4), 0, canvas.width / 2, 4);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBottomBound() {
  ctx.beginPath();
  ctx.rect(canvas.width * (1/4), canvas.height - 4, canvas.width / 2, 4);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawMiddleCircle() {

  //top paddle boundary
  ctx.beginPath();
  ctx.rect(0, canvas.height * (34.5/100), canvas.width, 1);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();

  //text in the middle
  ctx.font = "21px Pacifico";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("DH", (canvas.width / 2) - 20, (canvas.height / 2) + 8);

  //draw the circle enveloping the text
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI*2);
  ctx.stroke();

  //bottom paddle boundary
  ctx.beginPath();
  ctx.rect(0, canvas.height * (65.5/100), canvas.width, 1);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();

}

function drawMiddleCircleBorders() {
  //left
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo((canvas.width / 2) - 30, canvas.height / 2);
  ctx.strokeStyle = '#cc0000';
  ctx.stroke();

  //right
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2) + 30, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = '#cc0000';
  ctx.stroke();
}

function drawTopGoalEntrance() {
  ctx.beginPath();
  ctx.arc(canvas.width * (1/2), 0, 79, Math.PI, 0, true);
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#cc0000';
  ctx.stroke();
}

function drawBottomGoalEntrance() {
  ctx.beginPath();
  ctx.arc(canvas.width * (1/2), canvas.height, 79, 0, Math.PI, true);
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#cc0000';
  ctx.stroke();
}

//figure out how to split this up into its own paddle file
function drawTopPaddle() {
  ctx.beginPath();
  ctx.arc(topPaddleX, topPaddleY, topPaddleRadius, 0, Math.PI * 2);
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
  } else if (e.keyCode === 87) {
    wPressed = true;
  } else if (e.keyCode === 65) {
    aPressed = true;
  } else if (e.keyCode === 83) {
    sPressed = true;
  } else if (e.keyCode === 68) {
    dPressed = true;
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
  } else if (e.keyCode === 87) {
    wPressed = false;
  } else if (e.keyCode === 65) {
    aPressed = false;
  } else if (e.keyCode === 83) {
    sPressed = false;
  } else if (e.keyCode === 68) {
    dPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// function sleep(miliseconds) {
//    var currentTime = new Date().getTime();
//
//    while (currentTime + miliseconds >= new Date().getTime()) {
//    }
// }

function resetCoordinates() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  // setTimeout(() => clearInterval(continueExecution), 2000);
  // // setInterval(draw, 5);
  // sleep(2000);
  dx = -dx;
  dy = -dy;
}

function draw() {
  if (!allowCollision) {
    collisionCounter += 1;
    if (collisionCounter === 15) {
      allowCollision = true;
      collisionCounter = 0;
    }
  }

  // win logic
  if (Player1Score === 10) {
    Player1Score = 0;
    Player2Score = 0;
    alert("Player 1 wins!");
    document.location.reload();
  } else if (Player2Score === 10) {
    Player1Score = 0;
    Player2Score = 0;
    alert("Player 2 wins!");
    document.location.reload();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTopBound();
  drawTopPaddle();
  drawMiddleCircle();
  drawMiddleCircleBorders();
  drawBall();
  drawBottomPaddle();
  drawBottomBound();
  drawBottomGoalEntrance();
  drawTopGoalEntrance();

  let bottomPaddleDx = x - bottomPaddleX;
  let bottomPaddleDy = y - bottomPaddleY;
  let bottomPaddleDistance = Math.sqrt(bottomPaddleDx * bottomPaddleDx + bottomPaddleDy * bottomPaddleDy);

  let topPaddleDx = x - topPaddleX;
  let topPaddleDy = y - topPaddleY;
  let topPaddleDistance = Math.sqrt(topPaddleDx * topPaddleDx + topPaddleDy * topPaddleDy);


  //ball bouncing across left and right walls
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //ball bouncing across top and bottom walls (will need to add special cases later)
  if (y + dy < ballRadius) {
    if (x < canvas.width / 4 || x > canvas.width * (3 / 4)) {
      //make it bounce off of the parts of the wall without the goal
      dy = -dy;
    } else {
      //goal logic for player 2
      resetCoordinates();
      //increase the score
      nextRound = false;
      buttonTag.value = "Next Round";
      Player2Score += 1;
      tag2.innerHTML = Player2Score;
    }
  } else if (y + dy > canvas.height-ballRadius) {
    if (x < canvas.width / 4 || x > canvas.width * (3 / 4)) {
      dy = -dy;
    } else {
      //goal logic for player 1
      resetCoordinates();
      //increase the score
      nextRound = false;
      buttonTag.value = "Next Round";
      Player1Score += 1;
      tag.innerHTML = Player1Score;

    }
  }

  //fix bottom circle collision getting stuck (still needs some tweaking)
  if (allowCollision) {
    if (bottomPaddleDistance < ballRadius + bottomPaddleRadius) {
      allowCollision = false;
      if (dy < 0) {
        dy = -dy;
        y += 15;
      } else {
        dy = -dy;
        y -= 15;
      }

      if (dx < 0) {
        dx = -dx;
        x += 15;
      } else {
        dx = -dx;
        x -= 15;
      }
    }
  }

  //top paddle collision (not perfect)
  if (allowCollision) {
    if (topPaddleDistance < ballRadius + topPaddleRadius) {
      allowCollision = false;
      if (dy < 0) {
        dy = -dy;
        y += 15;
      } else {
        dy = -dy;
        y -= 15;
      }

      if (dx < 0) {
        dx = -dx;
        x += 15;
      } else {
        dx = -dx;
        x -= 15;
      }
    }
  }



  //keeps the top paddle within the boundaries of the table when moving left, right, up, or down
  if (dPressed && topPaddleX < canvas.width-(topPaddleRadius + 5)) {
    topPaddleX += 5;
  } else if (aPressed && topPaddleX > 25) {
    topPaddleX -= 5;
  } else if (sPressed && topPaddleY < (canvas.height * (3/10))) {
    topPaddleY += 5;
  } else if (wPressed && topPaddleY > topPaddleRadius + 5) {
    topPaddleY -= 5;
  }

  //keeps the bottom paddle within the boundaries of the table when moving left, right, up, or down
  if (rightPressed && bottomPaddleX < canvas.width-(bottomPaddleRadius + 5)) {
    bottomPaddleX += 5;
  } else if (leftPressed && bottomPaddleX > 25) {
    bottomPaddleX -= 5;
  } else if (downPressed && bottomPaddleY < canvas.height-(bottomPaddleRadius + 5)) {
    bottomPaddleY += 5;
  } else if (upPressed && bottomPaddleY > (canvas.height * (7/10))) {
    bottomPaddleY -= 5;
  }

  //keep the ball moving with the small change
    if (nextRound) {
      x += dx;
      y += dy;
    }
}

setInterval(draw, 5);
