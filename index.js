function restartGame() {
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const resultColor = document.querySelector('#result .player-color');
    const displayCurrentPlayer = document.querySelector('#current-player');
    let currentPlayer = 1;
    let gameOver = false;

    for (let i = 0; i < squares.length - 7; i++) {
        squares[i].addEventListener('click', () => {
            console.log(`Clicked: ${i}`);
            if (!gameOver && checkIfBelowTaken(i)) {
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

    const checkIfBelowTaken = (squareId) => {
        if (squareId < 0 && squareId >= squares.length - 7) {
            return false;
        }
        if (squares[squareId + 7].classList.contains('taken')) {
            console.log('Below square is taken')
            return true;
        }
        return false;
    }

    const checkHorizontal = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        for (let i = 0; i < 4; i++) {
            if (i > 0 && (position + i) % 7 === 0) {
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
            currentPosition = position + i * 7;
            if ((currentPosition) >= 42) {
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


    const checkSquareDescDesc = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        let currentPosition;
        for (let i = 0; i < 4; i++) {
            currentPosition = position + i * (7 + 1);
            if (i === 0) {
                if (currentPosition % 7 >= 4) {
                    return;
                }
            }
            if ((currentPosition) >= 42) {
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


    const checkSquareDescAsc = (position, currentPlayer) => {
        let counter = 0;
        let positions = [];
        let currentPosition;
        for (let i = 0; i < 4; i++) {
            currentPosition = position + i * (7 - 1);
            if (i === 0) {
                if (currentPosition % 7 < 3) {
                    return;
                }
            }
            if ((currentPosition) >= 42) {
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
        // console.log('we have row on ', positions);
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
        for (let s = 0; s < squares.length - 7; s++) {
            if (squares[s].classList.contains(checkForPlayer)) {
                console.log(`square: ${s} is taken by: ${squares[s].classList}`);
                if (checkHorizontal(s, checkForPlayer) ||
                    checkVertical(s, checkForPlayer) ||
                    checkSquareDescDesc(s, checkForPlayer) ||
                    checkSquareDescAsc(s, checkForPlayer)) {
                    return true;
                };
            }
        }
        console.log('-----------------');
        return false;

    }

    switchCurrentPlayerColor();
})