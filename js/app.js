// Array holding all cards in deck
const cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
                'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const cards = cardList.concat(cardList);

// Array to hold open and matched cards
const openCards = [];
const matchedCards = [];

// Global variables
let time;
let sec = 0;
let min = 0;

let totalMoves = 0;
let numMoves = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// Create HTML structure for each card
function makeCard(card) {
    return '<li class="card"><i class="fa ' + card + '"></i></li>';
}


// Compare 2 open cards for match
function compareCards(openCards) {
    const cardA = openCards[0];
    const cardB = openCards[1];

    if (cardA.firstElementChild.className ===
        cardB.firstElementChild.className) {
        cardsMatch(cardA, cardB);
    } else {
        setTimeout(function() {
            noMatch(cardA, cardB);
        }, 1000);
    }
    clearOpenCards();
}


// Convert to Matched cards
function cardsMatch(cardA, cardB) {
    //cardA.classList.remove('open', 'show');
    cardA.classList.add('match');
    //cardB.classList.remove('open', 'show');
    cardB.classList.add('match');

    matchedCards.push(cardA, cardB);
}


// Turn cards down if no match
function noMatch(cardA, cardB) {
    cardA.classList.remove('open', 'show');
    cardB.classList.remove('open', 'show');
}


// Clear array of open cards
function clearOpenCards() {
    openCards.length = 0;
}


// Clear array of matched cards
function clearMatchedCards() {
    matchedCards.length = 0;
}


// Start timer
function startTime() {
    time = setInterval(function() {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        const timeText = document.querySelector('.timer');
        timeText.innerHTML = formatTime();
    }, 1000);
}


// Stop timer
function stopTime() {
    clearInterval(time);
}


// Formats time in minutes and seconds
function formatTime() {
    if (sec < 10) {
        return (min + ":0" + sec);
    } else {
        return (min + ":" + sec);
    }
}


// Keep track of number of moves
function moveCounter() {
    totalMoves++;
    numMoves = Math.floor(totalMoves/2);
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = numMoves;
}


// Reset number of moves on score panel
function resetMoveCounter () {
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = numMoves;
}


// Remove a star from score panel
function removeStar() {
    const stars = document.querySelector('.stars');
    stars.firstElementChild.remove();
}


// Add 4 stars back to score panel
function addStars() {
    const stars = document.querySelector('.stars');
    let x;
    let starHTML = "";

    for (x = 0; x < 4; x++) {
    starHTML += '<li><i class="fa fa-star"></i></li>'
    }
    stars.innerHTML = starHTML;
}


// Shuffle and add cards to deck, start timer
function startGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardHTML.join('');

    startTime();
};


// Modal with stats pops up when game is won
function openModal() {
    const modal = document.getElementById('game-stats');
    const content = document.querySelector('.text-content');
    const stars = document.querySelector('.stars').childNodes.length;

    text = ("You Win!<br>Your time was " + formatTime() + ".<br>It took you " + numMoves + " moves.<br>You earned " + stars + " out of 4 stars.")

    content.innerHTML = text;

    modal.style.display = "block";
}


// Ends game
function endGame() {
    stopTime();
    openModal();
}


// Resets all data for new game
function restart () {
    totalMoves = 0;
    numMoves = 0;
    sec = 0;
    min = 0;
    stopTime();
    clearMatchedCards();
    clearOpenCards();
    resetMoveCounter();
    addStars();
    startGame();
}


// Start a new game
document.querySelector('.restart').addEventListener('click', function (event) {
    restart();
});


// Play game, open cards when clicked
document.querySelector('.deck').addEventListener('click', function (event) {
    const itemClicked = event.target;

    if (itemClicked.className === 'card' && openCards.length < 2) {
        openCards.push(itemClicked);
        itemClicked.classList.add('open', 'show');
        moveCounter();

        if (openCards.length === 2) {
            compareCards(openCards);
        }
    }

    if (totalMoves === 26 || totalMoves === 36 || totalMoves === 46) {
        removeStar();
    }

    if (matchedCards.length === cards.length) {
        endGame();
    }
});


// Restart game if user selects to Play Again in Modal
document.querySelector('.replay').addEventListener('click', function () {
    const modal = document.getElementById('game-stats');
    modal.style.display = "none";
    restart();
});


// Closes game modal when "x" is clicked
document.querySelector('.close').addEventListener('click', function () {
    const modal = document.getElementById('game-stats');
    modal.style.display = "none";
});
