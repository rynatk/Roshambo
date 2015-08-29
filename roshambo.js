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
function boldLog(message) {
  document.write('<p><b>' + message + '</b></p>');
};

function setupGame() {
  userName = prompt('Please enter username: ');
  boldLog('Hello ' + userName + '!');
  boldLog('Today you will be facing our computer, ' + computerName + ' in Roshambo!');
}

function userThrow() {
  var userInput = prompt('What do you throw... "rock", "paper", or "scissors"? \n (You can also type "exit" to end the game.)');
  userInput = userInput.charAt(0);
  userInput = userInput.toUpperCase();
  switch(userInput) {
    case 'R':
      userChoice = 'rock';
      break;
    case 'P':
      userChoice = 'paper';
      break;
    case 'S':
      userChoice = 'scissors';
      break;
    case 'E':
      userChoice = 'exit';
      break;
    default:
      userChoice = 'Woops!';
      break;
  }
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
  if(throwA === 'exit'){
    boldLog('Press CMD + R to refresh your browser and play again!');
  } else {
    log('(user) ' + throwA + ' --- ' + throwB + ' (computer)');
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
      log('Woops! Please try again.');
       engagement(userThrow(), computerThrow());
    }
  }
};

function bout(numba) {
  boldLog('BOUT #' + numba + '!');
  while(scoreKeep.userEngagementWins[0] < 2 && scoreKeep.computerEngagementWins[0] < 2 && userChoice != 'exit') {
    engagement(userThrow(), computerThrow());
  }
  if(scoreKeep.userEngagementWins[0] === 2){
    scoreKeep.userBoutWins[0] += 1;
    boldLog(userName + ' WINS BOUT #' + numba + '!');
  } else if(scoreKeep.computerEngagementWins[0] === 2){
    scoreKeep.computerBoutWins[0] += 1;
    boldLog(computerName + ' WINS BOUT #' + numba + '!');
  }
  scoreKeep.userEngagementWins[0] = 0;
  scoreKeep.computerEngagementWins[0] = 0;
  boutCount += 1;
};

function rsbMatch() {
  boldLog('Begin MATCH!');
  while(scoreKeep.userBoutWins[0] < 2 && scoreKeep.computerBoutWins[0] < 2 && userChoice != 'exit') {
    bout(boutCount);
  }
  if(scoreKeep.userBoutWins[0] === 2) {
    scoreKeep.userMatchWins[0] += 1;
    boldLog(userName + ' WINS THE MATCH!');
  } else if(scoreKeep.computerBoutWins[0] === 2){
    scoreKeep.computerMatchWins[0] += 1;
    boldLog(computerName + ' WINS THE MATCH!');
  }
  scoreKeep.userBoutWins[0] = 0;
  scoreKeep.computerBoutWins[0] = 0;
  boutCount = 1;
  if(userChoice != 'exit'){
    playAgain();
  }
};

function playAgain() {
  var again = prompt('Would you like to play again? "yes" or "no"');
  again = again.charAt(0);
  again = again.toUpperCase();
  switch (again) {
    case 'Y':
      again = 'yes';
      break;
    case 'N':
      again = 'no';
      break;
    default:
      again = 'no';
      break;
  }
  if(again === 'yes') {
  location.reload(true);
  } else if(again === 'no') {
    boldLog('Press CMD + R to refresh your browser and play again!');
  } else {
    boldLog('Press CMD + R to refresh your browser and play again!');
  }
}

setupGame();
rsbMatch();
