const symbols = ['🙂', '❤️', '😎', '🤩', '😭', '😬', '😵‍💫', '🫣'];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;

let moves = 0;
let time = 0;
let timer;

let gameRunning = false;

//const result = document.getElementById("result");
const startbutton=document.getElementById("startb");
const resetbutton=document.getElementById("resetb");
const statusbar=document.getElementById("stats");
const resultcontent=document.getElementById("controls");
        
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = time;
    }, 1000);
}
        
function createBoard() {
    cards = shuffle(cards);
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';

    moves = 0;
    time = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('time').textContent = time;
    clearInterval(timer);
    // startTimer();

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function startGame() {
    createBoard();
    gameRunning = true;
    startbutton.classList.add("hide");
    resetbutton.classList.add("hide");
    statusbar.classList.remove("hide");
    document.getElementById("stop").classList.remove("hide");
    document.getElementById("resume").classList.remove("hide");
    startTimer();
}


function stopGame() {
    clearInterval(timer);
    gameRunning = false;
    document.getElementById("stop").classList.add("hide");
    resetbutton.classList.add("hide");
}

function resumeGame() {
    if (!gameRunning) {
        startTimer();
        gameRunning = true;
    }
    document.getElementById("stop").classList.remove("hide");
    resetbutton.classList.add("hide");
}

function flipCard() {
    // if (this.classList.contains('flipped') || secondCard) return;
    if (!gameRunning || this.classList.contains('flipped') || secondCard) return;
    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');

    moves++;
    document.getElementById('moves').textContent = moves;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        setTimeout(checkMatch, 500);
    } 
}
        
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard = null;
        secondCard = null;
    } else {
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null; 
    }

    if (document.querySelectorAll('.card.flipped').length === cards.length) {
        clearInterval(timer);
        showResult();
        //document.getElementsById("gameBoard").classList.add("hide");
        // alert(`Congratulations! You solved it in ${moves} moves and ${time} seconds.`);
        //document.write(`<h2>You Won <br> Congratulations! You solved it in</h2> <br> <h4>Moves: ${moves} moves and ${time} seconds.</h4>`);
        //result.innerHTML = `<h2>You Won <br> Congratulations! You solved it in</h2> <br> <h4>Moves: ${moves} moves and ${time} seconds.</h4>`;
        //document.getElementById('result').textContent = `Congratulations! You solved it in ${moves} moves and ${time} seconds.`;
    } 
}
// function showResultWindow() {
//     const resultWindow = window.open('', '_blank', 'width=400,height=300');
//     resultWindow.document.write(`
//         <html>
//         <head>
//             <title>Game Result</title>
//             <style>
//                 body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
//                 button { padding: 10px 20px; margin-top: 20px; font-size: 16px; }
//             </style>
//         </head>
//         <body>
//             <h2>Congratulations!</h2>
//             <p>You solved it in ${moves} moves and ${time} seconds.</p>
//             <button onclick="window.opener.startGame(); window.close();">New Game</button>
//         </body>
//         </html>
//     `);
// }

function showResult() {
    document.getElementById("stop").classList.add("hide");
    document.getElementById("resume").classList.add("hide");
    resetbutton.classList.remove("hide");
    statusbar.classList.add("hide");
    document.querySelector('.stats').classList.add('hide');
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = time;
    //document.getElementById('result').style.display = 'block';
    document.getElementById('result').classList.remove('hide');
}

// startButton.addEventListener("click", () => {
//     moves = 0;
//     time = 0;

//     controls.classList.add("hide");
//     stopButton.classList.remove("hide");
//     startButton.classList.add("hide");


// })

// stopButton.addEventListener("click", (stopGame = () => {
//     controls.classList.remove("hide");
//     stopButton.classList.add("hide");
//     startButton.classList.remove("hide");
//     clearInterval(timer);
// }))

//createBoard();

