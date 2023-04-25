const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => {
        return board;
    };

    const updateBoard = (index, mark) => {
        board[index] = mark;
    };

    const resetBoard = () => {
        board = ["X", "", "", "", "O", "X", "", "", ""];
    };

    return {
        getBoard,
        updateBoard,
        resetBoard
    };
})();

const displayController = (() => {
    const board = document.querySelector(".board");

    const generateSquares = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("button");
            square.dataset.index = i;
            board.appendChild(square);
        }
    }
    
    generateSquares();

    const displayBoard = (board) => {
        const squares = document.querySelectorAll(".board button");
    
        squares.forEach((square) => {
            square.textContent = marks[square.dataset.index] 
        });
    }
})();

const createPlayer = (name, mark) => {
    return { name, mark }
}

const gameLogic = (() => {
    let player1;
    let player2;
    let currentPlayer;

    const createPlayers = () => {
        player1 = createPlayer("sanzhar", "X");
        player2 = createPlayer("arthur", "O");
    }

    const startGame = () => {
        createPlayers();
    }

    startGame();
})();