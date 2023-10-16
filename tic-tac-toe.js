/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: '1', 2: '2', 3: '3',
    4: '4', 5: '5', 6: '6',
    7: '7', 8: '8', 9: '9'
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    position = +position; // Convert the input string to a number
    while (board[position] !== 'X' && board[position] !== 'O') {
        board[position] = mark;
    } 
}



// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(`
    ${board[1]} | ${board[2]} | ${board[3]}
    ---------
    ${board[4]} | ${board[5]} | ${board[6]}
    ---------
    ${board[7]} | ${board[8]} | ${board[9]}
    `);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position, mark) {
    position = +position;

    if (position >= 1 && position <= 9 && board[position] !== 'X' && board[position] !== 'O') {
        return true;
    }
    if (isNaN(position)) {
        console.log('Wrong input. Please enter a number from 1-9 only.');
        return false; // Return false to indicate that the input was wrong (not a number)
    } 
    if (position < 1 || position > 9 || position === 0) {
        console.log('Invalid move. Enter a position from 1-9 only.');
        return false; // Return false to indicate that the move was out of bounds
    } 
    if (board[position] === 'X' || board[position] === 'O') {
        console.log('Invalid move. The position is already taken.');
        return false; // Return false to indicate that the move is invalid
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let mark = player;
      for (let combo of winCombinations) {
          const [a, b, c] = combo;
          if (board[a] === mark && board[b] === mark && board[c] === mark) {
            winnerIdentified = true;
            return true; 
          }
      }
      return false; // No win found
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= 9; i++) {
        if (board[i] !== 'X' && board[i] !== 'O') {
            return false; // If any position is not occupied by either 'X' or 'O', the board is not full
        }
    }
    return true; // If all positions are occupied by 'X' and 'O' only, the board is full
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;
    position = prompt(`Player ${player}'s turn. Choose your current position: `);
    return position;
}


// entry point of the whole program
function entryPoint() {
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');
}


let gameContinue = startGame();
let winnerIdentified = false;
let boardFull = false;
let currentTurnPlayer = 'X';

while (gameContinue) {
    while (!winnerIdentified && !boardFull){
        let position;
        position = playTurn(currentTurnPlayer);
        let validMove = validateMove(position, currentTurnPlayer);
        if(validMove){
            markBoard(position, currentTurnPlayer); 
            printBoard();
            winnerIdentified = checkWin(currentTurnPlayer);
            boardFull = checkFull();

            if (winnerIdentified) {
                console.log(`Player ${currentTurnPlayer} wins!`);
                gameContinue = startGame();
            }
            if (boardFull && !winnerIdentified) {
                console.log(`It's a tie!`);
                gameContinue = startGame();
            }
            if (gameContinue) {
                // Switch to the other player for the next turn
                currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
            } 
        }
        else {
            // Switch to the other player for the next turn
            currentTurnPlayer = currentTurnPlayer === 'X' ? 'X' : 'O';
        }
    }
    winnerIdentified = false;
    boardFull = false;
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function startGame() {
    let ans = prompt(`Would you like to start a new game? Y/N: `);

    if (ans.toUpperCase() === 'N') {
        console.log('Game finished.');
        return false; 
    } else {
        for (let i = 1; i <= 9; i++) {
        board[i] = i.toString(); // Convert the numbers to strings
        }
        entryPoint();
        return true;
    }
}