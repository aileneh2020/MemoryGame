# Memory Game Project

This is a browser-based card matching game.

## Table of Contents
* [How To Play](#howtoplay)
* [Resources](#resources)

## How To Play

Game starts when 'New Game' button is clicked. There are 16 cards in the deck which contain 8 pairs of matched cards. User clicks on a card to reveal the card. When 2 cards are revealed, a comparison is made. If the cards match, the cards are locked in. If the cards do not match, the cards are flipped over. User continues to play until all cards are matched.

The score panel keeps track of the timer, number of moves and star rating. Timer starts when 'New Game' button is clicked and stops when game is won. One move is counted each time 2 open cards are compared. Star rating is as follows: 0-12 moves = 4 stars; 13-17 moves = 3 stars; 18-22 moves = 2 stars; 23+ moves = 1 star.

When the game is won, a modal will display the game stats and provide option to restart. Each time a new game starts, the cards are randomly shuffled.

## Resources

Starter code provided by Udacity, which created the static design of the game board:
https://github.com/udacity/fend-project-memory-game

Background pattern from Subtle Patterns:
https://www.toptal.com/designers/subtlepatterns/?s=geometry2

Shuffle function obtained from:
http://stackoverflow.com/a/2450976


*Built using HTML, CSS and JavaScript
