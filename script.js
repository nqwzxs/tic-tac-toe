const gameLogic = (() => {
    let isGameActive = false;
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

    const handleBoardClick = (event) => {
        if (!isGameActive) return;

        const index = event.target.dataset.index
        const square = gameBoard.getBoard()[index]
        if (square !== "") return;

        gameBoard.updateBoard(index, currentPlayer.mark);
        displayController.displayBoard(gameBoard.getBoard());
    }

    return { startGame, handleBoardClick }
})();

const gameBoard = (() => {
    let board = ["", "", "", "O", "O", "", "", "", ""];

    const getBoard = () => {
        return board;
    };

    const updateBoard = (index, mark) => {
        board[index] = mark;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        updateBoard,
        resetBoard
    };
})();

const displayController = (() => {
    const board = document.querySelector(".board");
    
    const displayBoard = (board) => {
        const squares = document.querySelectorAll(".board button");

        squares.forEach((square) => {
            square.textContent = board[square.dataset.index]
        });
    }

    board.addEventListener("click", gameLogic.handleBoardClick)

    return { displayBoard }
})();

const createPlayer = (name, mark) => {
    return { name, mark }
}

gameLogic.startGame();