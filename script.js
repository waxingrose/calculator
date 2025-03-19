let playerSelection = prompt('Rock, Paper, or Scissors?')
let Rock = 'Rock'
let Paper = 'Paper'
let Scissors = 'Scissors'

let computerSelection = Math.floor(Math.random() * 3);
console.log(computerSelection);
switch (computerSelection) {
  case 0:
        Return = 'Rock';
    break;
  case 1:
        Return = 'Paper';
    break;
  case 2:
        Return = 'Scissors';
    break;
}
console.log(Return);

function playRound(playerSelection, computerSelection) {
    if (playerSelection == 'Rock' && computerSelection == 1) {
        alert('You lose! Paper beats Rock!');
        console.log('You lose! Paper beats Rock!');
    }
    else if (playerSelection == 'Paper' && computerSelection == 0) {
        alert('You win! Paper beats Rock!');
        console.log('You win! Paper beats Rock!');
    }
    else if (playerSelection == 'Scissors' && computerSelection == 0) {
        alert('You lose! Rock beats Scissors!');
        console.log('You lose! Rock beats Scissors!');
    }
    else if (playerSelection == 'Rock' && computerSelection == 2) {
        alert('You win! Rock beats Scissors');
        console.log('You win! Rock beats Scissors!');
    }
    else if (playerSelection == 'Paper' && computerSelection == 1) {
        alert('Tie!');
        console.log('Tie!');
    }
    else if (playerSelection == 'Rock' && computerSelection == 0) {
        alert('Tie!');
        console.log('Tie!');
    }
    else if (playerSelection == 'Scissors' && computerSelection == 2) {
        alert('Tie!');
        console.log('Tie!');
    }
    else {
        null
        alert('Null');
        console.log('Null');
    }
}
playRound()