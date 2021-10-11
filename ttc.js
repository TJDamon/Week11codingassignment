//HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xsymbol = 'x';
const osymbol = '0';

//game veriables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//functions

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner === 'x') {
        statusDiv.innerHTML = `X has won!`;
    } else {
        statusDiv.innerHTML = `O has won!`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    //check winner

    if(topLeft && topLeft === topMiddle && topLeft === topRight) {
       handleWin(topLeft);       
    }else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
    }else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
    }else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
    }else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
    }else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
    }else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
    }else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
    }else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomRight && bottomLeft && bottomMiddle) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Draw'; 
    }else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = 'X is next';
        }else {
            statusDiv.innerHTML = 'O is next';
        }
    }
}

//Event Handlers
const handleReset = () => {
    gameIsLive = true;
    xIsNext = true;
    statusDiv.innerHTML = 'X is next';
    winner = null;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    if (!gameIsLive || classList[2] === 'x' || classList[2] === 'o') {
        return;
    }


    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }

};

//Event Listeners
resetDiv.addEventListener('click', handleReset)

for (const cellDiv of cellDivs) {
 cellDiv.addEventListener('click', handleCellClick)
}