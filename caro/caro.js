const board = document.getElementById('board');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameStatus = document.getElementById('game-status');
let currentPlayer = 'X';
let cells = Array.from({ length: 3 }, () => Array(3).fill(null));
let gameStarted = false;


for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function startGame() {
  if (!gameStarted || checkDraw() || checkWinner()) {
    gameStatus.textContent = "Hãy chiến đấu hết mình!";
    gameStarted = true;
  }
}

function restartGame() {
  cells = Array.from({ length: 3 }, () => Array(3).fill(null));
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  gameStatus.textContent = "Bấm bắt đầu để chơi";
  gameStarted = false;
}

function handleClick() {
  if (!gameStarted || checkDraw() || checkWinner()) return;
  const row = parseInt(this.dataset.row);
  const col = parseInt(this.dataset.col);
  if (!cells[row][col]) {
    cells[row][col] = currentPlayer;
    this.textContent = currentPlayer;
    if (checkWinner()) {
      gameStatus.textContent = `${currentPlayer} thắng!`;
      highlightWinningCells();
      gameStarted = false;
      return;
    }
    if (checkDraw()) {
      gameStatus.textContent = "Hòa!";
      gameStarted = false;
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  
  for (let i = 0; i < 3; i++) {
    if (cells[i][0] && cells[i][0] === cells[i][1] && cells[i][0] === cells[i][2]) {
      return true;
    }
  }
  
  for (let j = 0; j < 3; j++) {
    if (cells[0][j] && cells[0][j] === cells[1][j] && cells[0][j] === cells[2][j]) {
      return true;
    }
  }
  
  if (cells[0][0] && cells[0][0] === cells[1][1] && cells[0][0] === cells[2][2]) {
    return true;
  }
  if (cells[0][2] && cells[0][2] === cells[1][1] && cells[0][2] === cells[2][0]) {
    return true;
  }
  return false;
}

function checkDraw() {
  return cells.every(row => row.every(cell => cell));
}

function highlightWinningCells() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (cells[i][0] && cells[i][0] === cells[i][1] && cells[i][0] === cells[i][2]) {
      document.querySelector(`.cell[data-row="${i}"][data-col="0"]`).classList.add('winner');
      document.querySelector(`.cell[data-row="${i}"][data-col="1"]`).classList.add('winner');
      document.querySelector(`.cell[data-row="${i}"][data-col="2"]`).classList.add('winner');
      return;
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (cells[0][j] && cells[0][j] === cells[1][j] && cells[0][j] === cells[2][j]) {
      document.querySelector(`.cell[data-row="0"][data-col="${j}"]`).classList.add('winner');
      document.querySelector(`.cell[data-row="1"][data-col="${j}"]`).classList.add('winner');
      document.querySelector(`.cell[data-row="2"][data-col="${j}"]`).classList.add('winner');
      return;
    }
  }
  // Check diagonals
  if (cells[0][0] && cells[0][0] === cells[1][1] && cells[0][0] === cells[2][2]) {
    document.querySelector(`.cell[data-row="0"][data-col="0"]`).classList.add('winner');
    document.querySelector(`.cell[data-row="1"][data-col="1"]`).classList.add('winner');
    document.querySelector(`.cell[data-row="2"][data-col="2"]`).classList.add('winner');
    return;
  }
  if (cells[0][2] && cells[0][2] === cells[1][1] && cells[0][2] === cells[2][0]) {
    document.querySelector(`.cell[data-row="0"][data-col="2"]`).classList.add('winner');
    document.querySelector(`.cell[data-row="1"][data-col="1"]`).classList.add('winner');
    document.querySelector(`.cell[data-row="2"][data-col="0"]`).classList.add('winner');
    return;
  }
}
