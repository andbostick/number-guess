//Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    
    //check if won
    if(guess === winningNum){
       gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        guessesLeft -= 1;
        if(guessesLeft === 0){
            //game lost
            gameOver(false,`Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            //wrong answer
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}


function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min, max) {
   return Math.floor(Math.random() *(max - min + 1) + min);
}