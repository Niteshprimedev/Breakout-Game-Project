
const rulesBtnEl = document.getElementById('rules-btn');
const rulesDivEl = document.getElementById('rules');
const closeBtnEl = document.getElementById('close-btn');
const canvasEl = document.getElementById('canvas');

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