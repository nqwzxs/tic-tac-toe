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
        gameBoard.resetBoard();
        displayController.hideModal();
        displayController.hideContainer();
        isGameActive = true;
        createPlayers();
        currentPlayer = player1;
        displayController.displayBoard(gameBoard.getBoard());
    }

    const createPlayers = () => {
        const playerNames = displayController.getPlayerInputs();
        player1 = createPlayer(playerNames[0], "X");
        player2 = createPlayer(playerNames[1], "O");
    }

    const playTurn = (event) => {
        if (!isGameActive) return;

        const index = event.target.dataset.index;
        const square = gameBoard.getBoard()[index];
        if (square !== "") return;

        gameBoard.updateBoard(index, currentPlayer.mark);
        displayController.displayBoard(gameBoard.getBoard());

        if (isWinner()) {
            winner = currentPlayer;
            endGame();
        } else if (isTie()) {
            endGame();
        }

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

    const endGame = () => {
        let result = winner ? `${winner.name} won the game!` : "It's a tie."
        displayController.addTextToModal(result);
        displayController.showModal();
        displayController.showContainer();
        isGameActive = false;
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
    const container = document.querySelector(".container");
    const resultModal = document.querySelector(".result-modal");
    
    const displayBoard = (board) => {
        const squares = document.querySelectorAll(".board button");
        
        squares.forEach((square) => {
            square.textContent = board[square.dataset.index];
        });
    }

    const addTextToModal = (result) => {
        resultModal.textContent = result;
    }

    const showModal = () => {
        resultModal.style.visibility = "visible";
    }

    const hideModal = () => {
        resultModal.style.visibility = "hidden";
    }
    
    const hideContainer = () => {
        container.style.visibility = "hidden";
    }

    const showContainer = () => {
        container.style.visibility = "visible";
    }

    const getPlayerInputs = () => {
        const playerInputs = document.querySelectorAll(".player-input");

        let playerNames = [];

        playerInputs.forEach((playerInput) => {
            playerNames.push(playerInput.value);
        });

        return playerNames;
    }

    board.addEventListener("click", gameLogic.playTurn);
    startButton.addEventListener("click", gameLogic.startGame)

    return {
        displayBoard,
        getPlayerInputs,
        hideContainer,
        showContainer,
        hideModal,
        showModal,
        addTextToModal
    }
})();

const createPlayer = (name, mark) => {
    return { name, mark }
}