
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
    speed: 4,
    dirXAxis: 4,
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

// Draw score on canvas; Writing text using canvas
function drawScore(){
    ctx.font = canvasFont;
    ctx.fillText(`Score: ${score}`, canvasEl.width - 100, 30);
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

// Draw everything;
function draw(){
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

draw();

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);