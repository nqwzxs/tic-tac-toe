const gameLogic = (() => {
    const threeInARows = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
    ]

    let isGameActive = false;
    let winner;

    let currentPlayer;
    let player1;
    let player2;

    const startGame = () => {
        isGameActive = true;
        createPlayers();
        currentPlayer = player1;
        displayController.displayBoard(gameBoard.getBoard());
    }

    const createPlayers = () => {
        player1 = createPlayer("sanzhar", "X");
        player2 = createPlayer("arthur", "O");
    }

    const playTurn = (event) => {
        if (!isGameActive) return;

        const index = event.target.dataset.index;
        const square = gameBoard.getBoard()[index];
        if (square !== "") return;

        gameBoard.updateBoard(index, currentPlayer.mark);
        displayController.displayBoard(gameBoard.getBoard());
        if (isWinner()) console.log("win");
        if (isTie()) console.log("tie");

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const isTie = () => {
        if (!gameBoard.isBoardAvailable()) return true;
    }

    const isWinner = () => {
        for (let index = 0; index < threeInARows.length; index++) {
            const row = threeInARows[index];
            if (row.every((index) => gameBoard.getBoard()[index] === currentPlayer.mark)) {
                return true
            };
        }
    }

    return { startGame, playTurn }
})();

const gameBoard = (() => {
    const winRows = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
        [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]
    ]

    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => {
        return board;
    };

    const updateBoard = (index, mark) => {
        board[index] = mark;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const checkRows = (mark) => {
        winRows.forEach((winRow) => {
            if (winRow.every((index) => board[index - 1] === mark)) return true;
        });
    }

    const isBoardAvailable = () => {
        if (board.includes("")) return true;
    }

    return {
        getBoard,
        updateBoard,
        resetBoard,
        checkRows,
        isBoardAvailable
    };
})();

const displayController = (() => {
    const board = document.querySelector(".board");
    const startButton = document.querySelector(".start-button");
    
    const displayBoard = (board) => {
        const squares = document.querySelectorAll(".board button");

        squares.forEach((square) => {
            square.textContent = board[square.dataset.index]
        });
    }

    board.addEventListener("click", gameLogic.playTurn)

    return { displayBoard }
})();

const createPlayer = (name, mark) => {
    return { name, mark }
}

gameLogic.startGame();