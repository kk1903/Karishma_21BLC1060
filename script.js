// script.js
const gridElement = document.getElementById('grid');
const statusElement = document.getElementById('status');
let currentPlayer = 'A'; 
let gameState = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

function initializeGrid() {
    gridElement.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.id = `${i}-${j}`;
            cell.textContent = gameState[i][j];
            gridElement.appendChild(cell);
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove() {
    const moveInput = document.getElementById('moveInput').value.trim();
    const [character, direction] = moveInput.split(':');
    if (!character || !direction) {
        alert('Invalid move format');
        return;
    }
    
    const [player, charType] = character.split('-');
    if (player !== currentPlayer) {
        alert("It's not your turn");
        return;
    }
    
    if (charType.startsWith('P')) {
        movePawn(player, charType, direction);
    } else if (charType.startsWith('H1')) {
        moveHero1(player, charType, direction);
    } else if (charType.startsWith('H2')) {
        moveHero2(player, charType, direction);
    }
    
    initializeGrid(); 
    checkForWinner(); 
    switchPlayer();   
}

function movePawn(player, pawn, direction) {
    let position = findCharacterPosition(player, pawn);
    if (!position) return;
    
    let [row, col] = position;
    let newRow = row;
    let newCol = col;
    
    switch (direction) {
        case 'L':
            newCol--;
            break;
        case 'R':
            newCol++;
            break;
        case 'F':
            newRow += player === 'A' ? 1 : -1;
            break;
        case 'B':
            newRow += player === 'A' ? -1 : 1;
            break;
    }
    
    if (isValidMove(newRow, newCol)) {
        gameState[row][col] = '';
        if (gameState[newRow][newCol]) {
            alert(`Player ${player} captures ${gameState[newRow][newCol]}`);
        }
        gameState[newRow][newCol] = `${player}-${pawn}`;
    } else {
        alert('Invalid move');
    }
}

function findCharacterPosition(player, charType) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (gameState[i][j] === `${player}-${charType}`) {
                return [i, j];
            }
        }
    }
    alert('Character not found');
    return null;
}

function isValidMove(row, col) {
    return row >= 0 && row < 5 && col >= 0 && col < 5;
}

function checkForWinner() {
    const allCharacters = gameState.flat();
    const playerAChars = allCharacters.filter(c => c.startsWith('A')).length;
    const playerBChars = allCharacters.filter(c => c.startsWith('B')).length;
    
    if (playerAChars === 0) {
        alert('Player B wins!');
        resetGame();
    } else if (playerBChars === 0) {
        alert('Player A wins!');
        resetGame();
    }
}

function resetGame() {
    gameState = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    initializeGrid();
    currentPlayer = 'A';
    statusElement.textContent = "Player A's turn";
}

initializeGrid();
