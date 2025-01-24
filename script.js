
const rulesBtnEl = document.getElementById('rules-btn');
const rulesDivEl = document.getElementById('rules');
const closeBtnEl = document.getElementById('close-btn');
const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

let score = 0;

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


// Draw ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPropsObj.xAxis, ballPropsObj.yAxis, ballPropsObj.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlePropsObj.xAxis, paddlePropsObj.yAxis, paddlePropsObj.width, paddlePropsObj.height);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw everything;
function draw(){
    drawBall();
    drawPaddle();
    drawScore();
}

// Draw score on canvas;
function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvasEl.width - 100, 30);
}
draw();

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);