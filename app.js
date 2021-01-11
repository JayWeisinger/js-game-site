document.addEventListener('DOMContentLoaded', () => {

    //card option
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('Sorry, try again')
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    //flip your card
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()

})

// Whack a mole section

const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
var moleBoard = document.querySelector('.grid2'); moleBoard.addEventListener('click', startCountDown);

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    //assign the id of the randomPositon to hitPosition for us to use later
    hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
        }
    })
})

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 900);
}

moveMole()

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
    }
}

function startCountDown() {
    let timerId = setInterval(countDown, 1000);
}

// connect-4 section fix bug that if this section is gone the rest of the page works also addd another dom event listener its fine

//fixed issue the issue. had to add the event listener and fix syntactial issue


document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid3 div');
    const result2 = document.querySelector('#result2');
    const displayCurrentPlayer = document.querySelector('#current-player');
    let currentPlayer = 1;

    for (var i = 0; i < squares.length; i++) {

        (function(index) {
        //add an onclick to each square in your grid
            squares[i].onclick = function() {
                //if the square below your current sqaure is taken you can go on top of it
                if(squares[index + 7].classList.contains('taken')) {
                    if (currentPlayer === 1) {
                        squares[index].classList.add('taken');
                        squares[index].classList.add('player-one');
                        //change the player
                        currentPlayer = 2;
                        displayCurrentPlayer.innerHTML = currentPlayer;
                    } else if (currentPlayer === 2) {
                        squares[index].classList.add('taken');
                        squares[index].classList.add('player-two');
                        //change the player
                        currentPlayer = 1;
                        displayCurrentPlayer.innerHTML = currentPlayer;
                    }
                    // if the square below your current square is not taken, you can't go there
                }   else alert('cant go here')  
            }
        })(i)
    }

    //check the board for a win or lose
    function checkBoard() {
        //make const that shows all winning arrays
        const winningArrays = [
        [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
        [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
        [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
        [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
        [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
        [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
        [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
        [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
        [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
        [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];
        //now take the 4 values in each winningArray and plug them into the squares values

        for(let y = 0; y < winningArrays.length; y++) {
            const square1 = squares[winningArrays[y][0]];
            const square2 = squares[winningArrays[y][1]];
            const square3 = squares[winningArrays[y][2]];
            const square4 = squares[winningArrays[y][3]];

            //now check those arrays to see if they all have a class of player-one

            if(square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')) {
                    //if they do, player-one is passed as the winner
                    result2.innerHTML = 'Player one wins!';
                }

            //now check to see if they all have the classname player two
            else if (square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')) {
                    result2.innerHTML = 'Player two wins!';
                }

        }

    }

    //add an event listener to each square that will trigger the checkboard function on click
    squares.forEach(square => square.addEventListener('click', checkBoard))

})

// Snake section

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid4 div');
    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0; //first div in grid
    let appleIndex = 0; //first div in grid
    let currentSnake = [2,1,0]; // so the div in our grid being 2(for head) and 0 being the end (tail, with all 1's eing the body from now on)
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start, and restart the game
    function startGame () {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that deals with ALL the outcomes of the snake
    function moveOutcomes() {

    
    //deals with snake hitting border and snake hitting self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop(); // removes the last index of snake array
    squares[tail].classList.remove('snake'); //removes class of snake from  the tail
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head of the array

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple();
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');

    }

    //generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length);
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // we are removing the class of snake
        
        if(e.keyCode === 39) {
            direction = 1; // if we press the right arrow on the keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width; // if we press the up arrow, the snake will go back ten divs appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width // if we press, down the snake head will go forward ten divs appearing to go down
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

})

// space invaders section

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid5 div');
    const resultDisplay = document.querySelector('#result3');
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId;

    //define the alien invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    // draw the alien invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    //draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    //move the shooter along a line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');
        switch(e.keyCode) {
            case 37:
                if(currentShooterIndex % width !== 0) {
                    currentShooterIndex -=1;
                }
                break;
            case 39:
                if(currentShooterIndex % width < width -1) {
                    currentShooterIndex +=1;
                }
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
        
    }
    document.addEventListener('keydown', moveShooter);

    //move alient invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        } else if(direction === width) {
            if(leftEdge) direction = 1;
            else direction = -1;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if(!alienInvadersTakenDown.includes(i)){
               squares[alienInvaders[i]].classList.add('invader'); 
            }
        }

        //decide if game is over
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderId);
        }

        for (let i = 0; i <= alienInvaders.length -1; i++) {
            if(alienInvaders[i] > (squares.length - (width - 1))) {
                resultDisplay.textContent = 'Game Over';
                clearInterval(invaderId);
            }
        }

        //declare a win
        if(alienInvadersTakenDown.length === alienInvaders.length) {
            resultDisplay.textContent = 'You Win';
            clearInterval(invaderId);
        }
    }

    invaderId = setInterval(moveInvaders, 500);

    //shoot at aliens
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        //move the laser from the shooter to the alien invader
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');
            if(squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result++;
                resultDisplay.textContent = result;
            }

            if(currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            }
        }

        switch(e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
        }
    }

    document.addEventListener('keyup', shoot);

})

//frogger section

document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid6 div');
    const timeLeft = document.querySelector('#time-left');
    const result = document.querySelector('#result4');
    const startBtn = document.querySelector('#button');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');
    const width = 9;
    let currentIndex = 76;
    let currentTime = 20;
    let timerId;

    //render frog on starting block
    squares[currentIndex].classList.add('frog');

    // write a function that will move the Frog
    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch(e.keyCode) {
            case 37:
                if(currentIndex % width !== 0) {
                    currentIndex -=1;
                }
                break;
            case 38:
                if(currentIndex - width >= 0) {
                    currentIndex -= width;
                }
                break;
            case 39:
                if(currentIndex % width < width -1) {
                    currentIndex +=1;
                }
                break;
            case 40:
                if(currentIndex + width < width * width) {
                    currentIndex += width;
                }
                break;
        }
        squares[currentIndex].classList.add('frog');
        lose();
        win();
    }

    //move cars
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }

    //move the car left of a time loop
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1');
                carLeft.classList.add('c2');
                break;
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2');
                carLeft.classList.add('c3');
                break;
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3');
                carLeft.classList.add('c1');
                break;
        }
    }

    //move the car right on a time loop
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1');
                carRight.classList.add('c3');
                break;
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2');
                carRight.classList.add('c1');
                break;
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3');
                carRight.classList.add('c2');
                break;
        }
    }

    //move the logs
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft));
        logsRight.forEach(logRight => moveLogRight(logRight));
    }

    //move the log left on a time loop
    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1');
                logLeft.classList.add('l2');
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2');
                logLeft.classList.add('l3');
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3');
                logLeft.classList.add('l4');
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5');
                logLeft.classList.add('l1');
                break;
        }
    }

    //move the log right on a time loop
    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1');
                logRight.classList.add('l5');
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2');
                logRight.classList.add('l1');
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3');
                logRight.classList.add('l2');
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4');
                logRight.classList.add('l3');
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5');
                logRight.classList.add('l4');
                break;

        }
    }

    //rules to win frogger
    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = 'YOU WON';
            //this one line breaks the code find out why
            
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }

    //rules to lose frogger
    function lose() {
        if (currentTime === 0 || (squares[currentIndex].classList.contains('c1')) || (squares[currentIndex].classList.contains('l5')) || (squares[currentIndex].classList.contains('l4'))) {
            result.innerHTML = 'YOU LOSE';
            squares[currentIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }
    
    //move the frog when its on the logs moving left
    function moveWithLogLeft() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove('frog');
            currentIndex -= 1;
            squares[currentIndex].classList.add('frog');
        }
    }

    //move the frog when its on the logs moving right
    function moveWithLogRight() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog');
            currentIndex += 1;
            squares[currentIndex].classList.add('frog');
        }
    }

    //all the functions that move pieces 
    function movePieces() {
        currentTime--;
        timeLeft.textContent = currentTime;
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
        
    }

    //to start and pause the game
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId);
        }   else {
            timerId = setInterval(movePieces, 1000);
            document.addEventListener('keyup', moveFrog);
        }
    })

})

//tetris section

document.addEventListener('DOMContentLoaded', () => {
    
    const startBtn = document.querySelector('.start-button');
    const grid = document.querySelector('.grid7');
    const displaySquares = document.querySelectorAll('.previous-grid div');
    let squares = Array.from(grid.querySelectorAll('.grid7 div'));
    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let timerId;

    //assign functions to keycodes
    function control(e) {
        if(e.keyCode === 39) {
            moveRight();
        } else if(e.keyCode === 38) {
            rotate();
        } else if(e.keyCode === 37) {
            moveLeft();
        } else if(e.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    //tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    //Randomly select Tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let currentRotation = 0;
    let current = theTetrominoes[random][currentRotation];

    //draw the shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
        })
    }

    //undraw the shape
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
        })
    }

    //move down shapes
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    //move left and prevent collisions with shapes moving left
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if(!isAtRightEdge) {
            currentPosition += 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -=1;
        }
        draw();
    }

    //same for right
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1;
        }
        draw();
    }

    //rotate Tetromino
    function rotate() {
        undraw();
        currentRotation ++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    //show the previous tetromino in displaySquares
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], /* lTetromino */
        [0, displayWidth, displayWidth+1, displayWidth*2+1], /* zTetromino */
        [1, displayWidth, displayWidth+1, displayWidth+2], /* tTetromino */
        [0, 1, displayWidth, displayWidth+1], /* oTetromino */
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] /* iTetromino */
    ];

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block');
        })
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block');
        })
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('block2'));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    })
    
})