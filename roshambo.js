// Coder: Ryan Atkinson
// Filename: roshambo.js
// This program simulates a game of Roshambo between the user and the computer.


//// Global Variables

// var userName = prompt('Please enter user name.');
var userChoice = '';
var computerChoice = '';
var scoreKeep = {
  userEngagementWins: [0],
  computerEngagementWins: [0],
  userBoutWins: [0],
  computerBoutWins: [0],
  userMatchWins: [0],
  computerMatchWins: [0]
};
var userName = 'Sir Xavier Roshambo Wallace';
var computerName = 'The Dreaded ROSHAMBOT v3.1';
var boutCount = 1;

//// Functions

function log(message) {
  document.write('<p>' + message + '</p>');
};

function setupGame() {
  userName = prompt('Please enter username: ');
  log('Hello ' + userName + '!');
  log('Today you will be facing our computer, ' + computerName + ' in Roshambo!');
}

function userThrow() {
  userChoice = prompt('What do you throw... "rock", "paper", or "scissors"?');
  return userChoice;
};

function computerThrow() {
  var a = Math.random();
  if (a < 0.34) {
	  computerChoice = 'rock';
  } else if (a <= 0.67) {
  	computerChoice = 'paper';
  } else {
	  computerChoice = 'scissors';
  }
  return computerChoice;
};

function AdvancedComputerThrow() {
  computerThrow();

}

function updateScore(player){
  if(player === 'user'){
    scoreKeep.userEngagementWins[0] += 1;
    //log(userName + ' wins the engagement!');
  } else {
    scoreKeep.computerEngagementWins[0] += 1;
    //log(computerName + ' wins the engagement!');
  }
  // log('user: ' + scoreKeep.userScore);
  // log('computer: ' + scoreKeep.computerScore);
}

function engagement(throwA, throwB) {
  log('(user) ' + throwA + ' (computer) ' + throwB);
  if(throwA === throwB) {
    log('Draw! Go again.');
    engagement(userThrow(), computerThrow());
  } else if(throwA === 'rock') {
    if(throwB === 'scissors') {
      updateScore('user');
    } else {
      updateScore('computer');
    }
  } else if(throwA === 'paper') {
    if(throwB === 'rock') {
      updateScore('user');
    } else {
      updateScore('computer');
    }
  } else if(throwA === 'scissors') {
    if(throwB === 'paper') {
      updateScore('user');
    } else {
      updateScore('computer');
    }
  } else {
    log('Woops! Please re-enter your throw: "rock", "paper", or "scissors!"');
    engagement(userThrow(), computerThrow());
  }
};

function bout(numba) {
  log('BOUT #' + numba + '!');
  while(scoreKeep.userEngagementWins[0] < 2 && scoreKeep.computerEngagementWins[0] < 2){
    engagement(userThrow(), computerThrow());
  }
  if(scoreKeep.userEngagementWins[0] === 2){
    scoreKeep.userBoutWins[0] += 1;
    log(userName + ' WINS BOUT #' + numba + '!');
  } else {
    scoreKeep.computerBoutWins[0] += 1;
    log(computerName + ' WINS BOUT #' + numba + '!');
  }
  scoreKeep.userEngagementWins[0] = 0;
  scoreKeep.computerEngagementWins[0] = 0;
  boutCount += 1;
};

function rsbMatch() {
  log('Begin MATCH!');
  while(scoreKeep.userBoutWins[0] < 2 && scoreKeep.computerBoutWins[0] < 2){
    bout(boutCount);
  }
  if(scoreKeep.userBoutWins[0] === 2){
    scoreKeep.userMatchWins[0] += 1;
    log(userName + ' WINS THE MATCH!');
  } else {
    scoreKeep.computerMatchWins[0] += 1;
    log(computerName + ' WINS THE MATCH!');
  }
  scoreKeep.userBoutWins[0] = 0;
  scoreKeep.computerBoutWins[0] = 0;
  boutCount = 1;
};

setupGame();
rsbMatch();
