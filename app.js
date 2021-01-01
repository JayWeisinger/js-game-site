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