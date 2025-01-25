
const rulesBtnEl = document.getElementById('rules-btn');
const rulesDivEl = document.getElementById('rules');
const closeBtnEl = document.getElementById('close-btn');
const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

const canvasFillStyle = '#0095dd';
const canvasFont = '20px Arial';

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; // delay to reset the game;

// Rules Show Event Handlers
rulesBtnEl.addEventListener('click', showRules);

function showRules(){
    rulesDivEl.classList.add('show');
}

// Rules Close Event Handlers
closeBtnEl.addEventListener('click', closeRules);

function closeRules(){
    rulesDivEl.classList.remove('show');
}

// Create ball props;
const ballPropsObj = {
    xAxis: canvasEl.width / 2,
    yAxis: canvasEl.height / 2,
    size: 10,
    speed: 4,
    dirXAxis: 4,
    dirYAxis: -4,
}

// Create paddle props:
const paddlePropsObj = {
    xAxis: (canvasEl.width / 2) - 40,
    yAxis: canvasEl.height - 20,
    width: 80,
    height: 10,
    speed: 8,
    dirXAxis: 0,
}

// Create brick props:
const brickPropsObj = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Draw ball on canvas: Creating a circle using canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPropsObj.xAxis, ballPropsObj.yAxis, ballPropsObj.size, 0, Math.PI * 2);
    ctx.fillStyle = canvasFillStyle;
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas: Creating a rectangle using canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlePropsObj.xAxis, paddlePropsObj.yAxis, paddlePropsObj.width, paddlePropsObj.height);
    ctx.fillStyle = canvasFillStyle;
    ctx.fill();
    ctx.closePath();
}

// Create bricks
const bricks = [];

for(let rowI = 0; rowI < brickRowCount; rowI++){
    bricks[rowI] = [];

    for(let rowJ = 0; rowJ < brickColumnCount; rowJ++){
        const xAxis = rowI * (brickPropsObj.width + brickPropsObj.padding) + brickPropsObj.offsetX;
        const yAxis = rowJ * (brickPropsObj.height + brickPropsObj.padding) + brickPropsObj.offsetY;

        bricks[rowI][rowJ] = { xAxis, yAxis, ...brickPropsObj};
    }
}

// Draw bricks on canvas: Creating a rectangle using canvas;
function drawBricks() {
    bricks.forEach(brickCol => {
        brickCol.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.xAxis, brick.yAxis, brick.width, brick.height);
            ctx.fillStyle = brick.visible ? canvasFillStyle : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

// Draw score on canvas; Writing text using canvas
function drawScore(){
    ctx.font = canvasFont;
    ctx.fillText(`Score: ${score}`, canvasEl.width - 100, 30);
}

// Draw everything;
function draw(){

    // clear paddle on canvas
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function movePaddle(){
    paddlePropsObj.xAxis += paddlePropsObj.dirXAxis;

    // Camvas Right Wall detection:
    const isCanvasRightWidthCrossed = paddlePropsObj.xAxis + paddlePropsObj.width > canvasEl.width;
    
    if(isCanvasRightWidthCrossed){
        paddlePropsObj.xAxis = canvasEl.width - paddlePropsObj.width;
    }
    
    // Canvas Left Wall detection:
    const isCanvasLeftWidthCrossed = paddlePropsObj.xAxis < 0;

    if(isCanvasLeftWidthCrossed){
        paddlePropsObj.xAxis = 0;
    }
}

// Move Ball on canvas;
function moveBall(){
    ballPropsObj.xAxis += ballPropsObj.dirXAxis;
    ballPropsObj.yAxis += ballPropsObj.dirYAxis;

    // Canvas Left/Right wall collision Detection;
    const isCanvasLeftRightCollision = ballPropsObj.xAxis + ballPropsObj.size > canvasEl.width || ballPropsObj.xAxis - ballPropsObj.size < 0;

    if(isCanvasLeftRightCollision){
        ballPropsObj.dirXAxis *= -1;
    }

    // Canvas Top/Bottom wall collision Detection;
    const isCanvasTopBottomCollision = ballPropsObj.yAxis + ballPropsObj.size > canvasEl.height || ballPropsObj.yAxis - ballPropsObj.size < 0;
    if(isCanvasTopBottomCollision){
        ballPropsObj.dirYAxis *= -1;
    }

    // Canvas Ball & Paddle Collision Detection;
    const isCanvasBallPaddleCollision = ballPropsObj.xAxis - ballPropsObj.size > paddlePropsObj.xAxis && ballPropsObj.xAxis + ballPropsObj.size < paddlePropsObj.xAxis + paddlePropsObj.width && ballPropsObj.yAxis + ballPropsObj.size > paddlePropsObj.yAxis;

    if(isCanvasBallPaddleCollision){
        ballPropsObj.dirYAxis = -ballPropsObj.speed;
    }

    // Bricks Collision;
    bricks.forEach(brickColumn => {
        brickColumn.forEach(brick => {
            if(brick.visible){
                const isLeftBrickHit = ballPropsObj.xAxis - ballPropsObj.size > brick.xAxis;
                const isRightBrickHit = ballPropsObj.xAxis + ballPropsObj.size < brick.xAxis + brick.width;
                const isTopBrickHit = ballPropsObj.yAxis + ballPropsObj.size > brick.yAxis;
                const isBottomBrickHit = ballPropsObj.yAxis - ballPropsObj.size < brick.yAxis + brick.height;
                if(isLeftBrickHit && isRightBrickHit && isTopBrickHit && isBottomBrickHit){
                    ballPropsObj.dirYAxis *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });

    // Hit Bottom Wall & Lose;
    const isPaddleMissed = ballPropsObj.yAxis + ballPropsObj.size > canvasEl.height;

    // if(isPaddleMissed){
    //     showAllBricks();
    //     score = 0;
    // }
}

// Increase Score;
function increaseScore() {
    score++;

    // All the Balls Hit;
    // const allBricksHit = score >= bricks.length * bricks[0].length;
    const allBricksCleared = score % (brickRowCount * brickRowCount) === 0;

    if(allBricksCleared){
        showAllBricks();

        //After 0.5 sec restart the game
        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay);
    }
}

// Make All Bricks appear;
function showAllBricks(){
    bricks.forEach(brickColumn => {
        brickColumn.forEach(brick => (brick.visible = true));
    });
}

// Keyboard event handlers;
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Key Down Event
function keyDown(keyEventEl){
    
    if(keyEventEl.key === 'ArrowRight' || keyEventEl.key === 'Right'){
        paddlePropsObj.dirXAxis = paddlePropsObj.speed;
    }
    else if(keyEventEl.key === 'ArrowLeft' || keyEventEl.key === 'Left'){
        paddlePropsObj.dirXAxis = -paddlePropsObj.speed;
    }
}

// Key Up Event
function keyUp(keyEventEl){
    if(keyEventEl.key === 'ArrowRight' || keyEventEl.key === 'Right' || keyEventEl.key === 'ArrowLeft' || keyEventEl.key === 'Left'){
        paddlePropsObj.dirXAxis = 0;
    }
}

// Update canvas drawing and animation
function update() {
    movePaddle();
    moveBall();

    // Draw everything
    draw();
  
    requestAnimationFrame(update);
  }
  
  update();

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);