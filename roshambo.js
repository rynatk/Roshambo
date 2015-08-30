// Coder: Ryan Atkinson
// Filename: roshambo.js
// This program simulates a game of Roshambo between the user and the computer.


//// Global Variables

var userChoice = '';
var userPreviousChoice = '';
var computerChoice = '';
var scoreKeep = {
  userEngagementWins: [0],
  computerEngagementWins: [0],
  userBoutWins: [0],
  computerBoutWins: [0],
  userMatchWins: [0],
  computerMatchWins: [0]
};
var userName = 'William "Roshambo" Wallace';
var computerName = 'ROSHAM-BOT 3K';
var boutCount = 1;
var compEngagementWin = false;

//// Functions

function log(message) {
  document.write('<p>' + message + '</p>');
};

function boldLog(message) {
  document.write('<p><b>' + message + '</b></p>');
};

function setupGame() {
  userName = prompt('Please enter username: ');
  if(userName != ''){
    boldLog('Hello ' + userName + '!');
    boldLog('Today you will be facing our computer, ' + computerName + ' in Roshambo!');
    alert('You are playing Roshambo! Win 2 out of 3 Engagements to win the Bout! Win \
2 out of 3 Bouts to win the Match! Good Luck! Our Advanced AI is tough!')
    rsbMatch();
  } else {
    boldLog('Please enter a username to play Roshambo!');
    boldLog('Press CMD + R to refresh your browser and play again!');
  }
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

function advancedComputerThrow() {
  if(userPreviousChoice === '') {
    computerThrow();
  } else if(compEngagementWin === true) {
    computerChoice = userPreviousChoice;
  } else if(compEngagementWin === false) {
    if(userPreviousChoice === 'rock') {
      computerChoice = 'paper';
    } else if(userPreviousChoice === 'paper') {
      computerChoice = 'scissors';
    } else {
      computerChoice = 'rock';
    }
  }
  return computerChoice;
}

function updateScore(player){
  if(player === 'user'){
    scoreKeep.userEngagementWins[0] += 1;
  } else {
    scoreKeep.computerEngagementWins[0] += 1;
  }
}

function engagement(throwA, throwB) {
  if(throwA === 'exit'){
    boldLog('Press CMD + R to refresh your browser and play again!');
  } else {
    //if(userChoice != 'Woops!'){
      log('(user) ' + throwA + ' --- ' + throwB + ' (computer)');
    //}
    if(throwA === throwB) {
      //log('(user) ' + throwA + ' --- ' + throwB + ' (computer)') + boldLog(' Draw!');
      alert('Draw! Go again.');
      engagement(userThrow(), computerThrow());     //Advanced AI randomizes on draw
    } else if(throwA === 'rock') {
      userPreviousChoice = userChoice;
      if(throwB === 'scissors') {
        updateScore('user');
        compEngagementWin = false;
      } else {
        updateScore('computer');
        compEngagementWin = true;
      }
    } else if(throwA === 'paper') {
      userPreviousChoice = userChoice;
      if(throwB === 'rock') {
        updateScore('user');
        compEngagementWin = false;
      } else {
        updateScore('computer');
        compEngagementWin = true;
      }
    } else if(throwA === 'scissors') {
      userPreviousChoice = userChoice;
      if(throwB === 'paper') {
        updateScore('user');
        compEngagementWin = false;
      } else {
        updateScore('computer');
        compEngagementWin = true;
      }
    } else {
      alert('Woops! Please try again.');             // Advanced AI randomizes on mis-entry
       engagement(userThrow(), computerThrow());
    }
  }
};

function bout(numba) {
  boldLog('BOUT #' + numba + '!');
  while(scoreKeep.userEngagementWins[0] < 2 && scoreKeep.computerEngagementWins[0] <
      2 && userChoice != 'exit') {
    engagement(userThrow(), advancedComputerThrow());
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
  boldLog('User Match Wins:     ' + scoreKeep.userMatchWins[0]);              // code for leaderboard (doesn't carry between matches)
  boldLog('Computer Match Wins: ' + scoreKeep.computerMatchWins[0]);
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
