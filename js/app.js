/*-------------------------------- Constants --------------------------------*/
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  
  let board = ['','','','','','','','',''];
  let turn = 'X';
  let winner = null;
  let tie = false;
  
  /*------------------------ Cached Element References ------------------------*/
  
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.getElementById('message');
  const resetBtnEl = document.getElementById('reset');
  
  /*-------------------------------- Functions --------------------------------*/
  
  function checkWinner() {
    for (let combo of winningCombo) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        return true;
      }
    }
  
    if (!board.includes(null)) {
      tie = true;
      return true;
    }
  
    return false;
  }
  
  function updateMessage() {
    messageEl.textContent = `Turn: ${turn}`;
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  
  squareEls.forEach((square, idx) => {
    square.addEventListener('click', () => {
      if (square.textContent !== '' || winner) return; 
  
      if (turn === 'X') {
        square.textContent = 'X';
        board[idx] = 'X';
        turn = 'O';
      } else {
        square.textContent = 'O';
        board[idx] = 'O';
        turn = 'X';
      }
  
      updateMessage();
  
      if (checkWinner()) {
        if (winner) {
          messageEl.textContent = `Winner: ${winner}`;
        } else {
          messageEl.textContent = `It's a tie!`;
        }
      }
    });
  });
  
  resetBtnEl.addEventListener('click', () => {
    board.fill(null);
    turn = 'X';
    winner = null;
    tie = false;
    squareEls.forEach(square => square.textContent = '');
    updateMessage(); 
  });
  