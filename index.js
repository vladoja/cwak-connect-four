function restartGame() {
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const resultColor = document.querySelector('#result .player-color');
    const displayCurrentPlayer = document.querySelector('#current-player');
    let currentPlayer = 1;
    let gameOver = false;

    const gridHeight = 6;
    const gridWidth = 7;
    const gridTotalPositions = gridWidth * gridHeight;

    for (let i = 0; i < squares.length - gridWidth; i++) {
        squares[i].addEventListener('click', () => {
            console.log(`Clicked: ${i}`);
            if (!gameOver && !checkIfCurrentTaken(i) && checkIfBelowTaken(i)) {
                if (currentPlayer === 1) {
                    squares[i].classList.add('taken');
                    squares[i].classList.add('player-one');
                    if (checkBoard()) {
                        handleGameOver(currentPlayer);
                    }
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                    switchCurrentPlayerColor();
                } else if (currentPlayer === 2) {
                    squares[i].classList.add('taken');
                    squares[i].classList.add('player-two');
                    if (checkBoard()) {
                        handleGameOver(currentPlayer);
                    }

                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                    switchCurrentPlayerColor();
                }


            }
        });

        squares[i].classList.add(`position-${i}`);
    }


    const handleGameOver = (currentPlayer) => {
        gameOver = true;
        const currentPlayerDisplay = document.querySelector('#current-player-display');
        currentPlayerDisplay.style.display = "none";
        result.style.display = "block";
        resultColor.innerHTML = `${currentPlayer}`;
        resultColor.classList.add(createCurrentPlayerClass(currentPlayer));
    }


    const checkIfCurrentTaken = (squareId) => {
        if (squareId < 0 && squareId >= squares.length) {
            return false;
        }
        if (squares[squareId].classList.contains('taken')) {
            return true;
        }
        return false;
    }

    const checkIfBelowTaken = (squareId) => {
        if (squareId < 0 && squareId >= squares.length - gridWidth) {
            return false;
        }
        if (squares[squareId + gridWidth].classList.contains('taken')) {
            // console.log('Below square is taken');
            return true;
        }
        return false;
    }

    const checkHorizontal = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        for (let i = 0; i < 4; i++) {
            if (i > 0 && (position + i) % gridWidth === 0) {
                return;
            }
            if (squares[position + i].classList.contains(currentPlayer)) {
                positions.push(position + i);
                counter++;
            }
        }
        if (counter == 4) {
            highLightWinners(positions, currentPlayer);
            return true;
        }
        return false;
    }


    const checkVertical = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        let currentPosition;
        for (let i = 0; i < 4; i++) {
            currentPosition = position + i * gridWidth;
            if ((currentPosition) >= gridTotalPositions) {
                return;
            }
            if (squares[currentPosition].classList.contains(currentPlayer)) {
                positions.push(currentPosition);
                counter++;
            }
        }
        if (counter == 4) {
            highLightWinners(positions, currentPlayer);
            return true;
        }
        return false;
    }


    const checkSquareDesc = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        let currentPosition;
        for (let i = 0; i < 4; i++) {
            currentPosition = position + i * (gridWidth + 1);
            if (i === 0) {
                if (currentPosition % gridWidth >= 4) {
                    return;
                }
            }
            if ((currentPosition) >= gridTotalPositions) {
                return;
            }
            if (squares[currentPosition].classList.contains(currentPlayer)) {
                positions.push(currentPosition);
                counter++;
            }
        }
        if (counter == 4) {
            highLightWinners(positions, currentPlayer);
            return true;
        }
        return false;
    }


    const checkSquareAsc = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        let currentPosition;
        for (let i = 0; i < 4; i++) {
            currentPosition = position + i * (gridWidth - 1);
            if (i === 0) {
                if (currentPosition % gridWidth < 3) {
                    return;
                }
            }
            if ((currentPosition) >= gridTotalPositions) {
                return;
            }
            if (squares[currentPosition].classList.contains(currentPlayer)) {
                positions.push(currentPosition);
                counter++;
            }
        }
        if (counter == 4) {
            // positions.forEach(p => squares[p].classList.add('highlight'));
            highLightWinners(positions, currentPlayer);
            return true;
        }
        return false;
    }


    const highLightWinners = (winPositionsArray, currentPlayer) => {
        console.log('Current winner ', currentPlayer);
        console.log('we have row on ', winPositionsArray);
        winPositionsArray.forEach(p => squares[p].classList.add('highlight'));
    }


    const switchCurrentPlayerColor = () => {
        displayCurrentPlayer.classList.remove('player-one');
        displayCurrentPlayer.classList.remove('player-two');
        displayCurrentPlayer.classList.add(createCurrentPlayerClass(currentPlayer));
    }

    const createCurrentPlayerClass = (currentPlayer) => {
        return (currentPlayer === 1) ? 'player-one' : 'player-two';
    }

    const checkBoard = () => {
        const checkForPlayer = createCurrentPlayerClass(currentPlayer);
        for (let s = 0; s < squares.length - gridWidth; s++) {
            if (squares[s].classList.contains(checkForPlayer)) {
                console.log(`square: ${s} is taken by: ${squares[s].classList}`);
                if (checkHorizontal(s, checkForPlayer) ||
                    checkVertical(s, checkForPlayer) ||
                    checkSquareDesc(s, checkForPlayer) ||
                    checkSquareAsc(s, checkForPlayer)) {
                    return true;
                };
            }
        }
        console.log('-----------------');
        return false;

    }

    switchCurrentPlayerColor();
})