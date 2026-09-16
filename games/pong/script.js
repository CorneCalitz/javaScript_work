/** 
 * Classic Pong
 * - made using html and javaScript
 * 
*/

// Initialize canvas area
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

const MAX_COMPUTER_SPEED = 4;

// Instantiate ball variables
const BALL_SIZE = 10;
let ballPosition;
let xSpeed;
let ySpeed;

//Instantiates paddles
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 70;
const PADDLE_OFFSET = 10;

//Set paddle position to center of canvas 
let leftPaddleTop = width/2 - PADDLE_HEIGHT;
let rightPaddleTop = width/2 - PADDLE_HEIGHT;

// Instantiate scores for players
let leftScore = 0;
let rigthtScore = 0;

let gameOver = false;

document.addEventListener("mousemove", e => {
    rightPaddleTop = e.y - canvas.offsetTop;
});


function draw() {
    // Fill canvas with black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    //Everything else will be white
    ctx.fillStyle = 'white';

    // Draw ball
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

    // Draw paddles
    //Left
    ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT)
    //Right
    ctx.fillRect(width - PADDLE_WIDTH - PADDLE_OFFSET, rightPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT)

    //Draw scores
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    ctx.fillText(leftScore.toString(), 50, 50);
    ctx.textAlign = "right";
    ctx.fillText(rigthtScore.toString(), width - 50, 50);
}

function initBall(xDirection, yDirection) {

    ballPosition = {x: width/2, y: height/2};
    xSpeed = xDirection*8;
    ySpeed = yDirection*4;
    
};

function followBall() {
    let ball = {
        top: ballPosition.y,
        bottom:ballPosition.y + BALL_SIZE
    };

    let leftPaddle = { 
        top: leftPaddleTop, 
        bottom: leftPaddleTop + PADDLE_HEIGHT 
    }; 

    if (ball.top < leftPaddle.top) {
        leftPaddleTop -= MAX_COMPUTER_SPEED;
    } else if (ball.bottom > leftPaddle.bottom) {
        leftPaddleTop += MAX_COMPUTER_SPEED
    }
}

function update() {
    // updates ball position on canvas
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
    followBall();

}

function adjustAngle(distanceFromTop, distanceFromBottom) {
    if (distanceFromTop < 10) {
        //If ball hit near top of paddle, reduce ySpeed
        ySpeed -= 1;
    } else if (distanceFromBottom < 10) {
        //If ball hit near top of paddle, increase ySpeed;
        ySpeed += 1;
    }
}

function checkPaddleCollision(ball, paddle) {
    // Check if the paddle and ball overlap vertically and horizontally.

    return (
        ball.left < paddle.right &&
        ball.right > paddle.left &&
        ball.top < paddle.bottom &&
        ball.bottom > paddle.top
    );

}

function checkCollision() {
    //Checks if the ball makes a collision with canvas edge or paddles
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    let leftPaddle = { 
        left: PADDLE_OFFSET, 
        right: PADDLE_OFFSET + PADDLE_WIDTH, 
        top: leftPaddleTop, 
        bottom: leftPaddleTop + PADDLE_HEIGHT 
    };

    let rightPaddle = { 
        left: width - PADDLE_WIDTH - PADDLE_OFFSET, 
        right: width - PADDLE_OFFSET, 
        top: rightPaddleTop, 
        bottom: rightPaddleTop + PADDLE_HEIGHT 
    };

    if (checkPaddleCollision(ball, leftPaddle)) {
        // Left paddle collision happened
        let distanceFromTop = ball.top - leftPaddle.top;
        let distanceFromBottom = leftPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = Math.abs(xSpeed);
    }

    if (checkPaddleCollision(ball, rightPaddle)) {
        //Right paddle collision happened
        let distanceFromTop = ball.top - rightPaddle.top;
        let distanceFromBottom = rightPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = -Math.abs(xSpeed);
    }

    // xDirection of the ball is determined by who won.
    // Whoever loses a round needs to receive the first serve
    // The yDirection is set to zero so that the ball gets served staight
    if (ball.left < 0) {
        rigthtScore ++;
        initBall(1, 0)
    }

    if (ball.right > width) {
        leftScore ++;
        initBall(-1, 0)
    }

    if (leftScore > 5 || rigthtScore > 5){
        gameOver = true;
    }

    if (ball.top < 0 || ball.bottom > height) {
            ySpeed = -ySpeed;
        } 

    if (ball.left < 0 || ball.right > width) {
        xSpeed = -xSpeed;
    } 
 
}

function drawGameOver() {
    ctx.fillStyle = "white"; 
    ctx.font = "30px monospace"; 
    ctx.textAlign = "center"; 
    ctx.fillText("GAME OVER", width/2, height - 100); 
} 



function gameLoop() {  
// loop that repeats draws and updates
    draw();
    update();
    checkCollision();

    if (gameOver) {
        draw();
        drawGameOver();
    } else {
        // Call this function again after a timeout
        setTimeout(gameLoop, 15);
        
    }
}

initBall(1, 0);
gameLoop();



