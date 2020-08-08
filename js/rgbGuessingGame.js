// This function returns a random number from min to max (inclusive)
function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function returns a random color as a string
function getRandomColor(){
	return "rgb(" + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ")";
}

// This function instantiates an instance of a new game
function newGameInstance(){
	header.style.backgroundColor = "#616A6B";
	result.textContent = "";

	var numberOfSquares = isHardMode ? squares.length : 3;

	for (var counter = 0; counter < numberOfSquares; counter++) {
		// Changes the squares' background color to a random color
		squares[counter].style.backgroundColor = getRandomColor();
		// Re-enables all of the squares
		squares[counter].addEventListener("click", squares_Click);
	}

	// Picks a random square's background color as the chosen color
	rgbDisplay.textContent = squares[getRandomNumber(0, numberOfSquares - 1)].style.backgroundColor;
}

// This function starts the countdown timer
function startCountdownTimer(){
	var timeRemaining = 180; // In seconds

	var timer = setInterval(function(){
		if(timeRemaining > 0){
			--timeRemaining;
			countdownTimer.textContent = timeRemaining;
		}
		else{
			// Stops the timer once it reaches zero
			clearInterval(timer);

			alert(`You got ${score.textContent} ` + (Number(score.textContent) == 1 ? "point!" : "points!"));

			newGameBtn.click();
		}
	}, 1000);

	return timer;
}

// This function starts the timer towards a new round
function startNewRoundTimer(){
	var timeRemaining = 1; // In seconds

	var timer = setInterval(function(){
		if (timeRemaining > 0) {
			--timeRemaining;
		}
		else{
			clearInterval(timer);

			newGameInstance();
		}
	}, 750);

	return timer;
}

// This function handles the squares' click event
function squares_Click(e){
	if(!hasTimerStarted){
		cTimer = startCountdownTimer();
		hasTimerStarted = true;
	}

	// Checks if the clicked square's background color is the same as the chosen color
	if(e.currentTarget.style.backgroundColor == rgbDisplay.textContent){
		// Changes the header's background color to the chosen color
		header.style.backgroundColor = rgbDisplay.textContent;
		result.textContent = "Correct!";

		// If it is on hard mode, the number of squares is 6, otherwise 3.
		var numberOfSquares = isHardMode ? squares.length : 3;

		for (var counter = 0; counter < numberOfSquares; counter++) {
			// Changes the colors of the squares to the chosen color after a successful guess
			squares[counter].style.backgroundColor = rgbDisplay.textContent;
			// Disables all of the squares
			squares[counter].removeEventListener("click", squares_Click);
		}

		// Adds 5 to the score if it's on hard mode, otherwise 3
		score.textContent = Number(score.textContent) + (isHardMode ? 5 : 3);

		nRTimer = startNewRoundTimer();
	}
	else{
		result.textContent = "Try again.";
		// Hides the incorrect square
		e.currentTarget.style.backgroundColor = "#232323";
		// Disables the incorrect square
		e.currentTarget.removeEventListener("click", squares_Click);
 
		if(Number(score.textContent) != 0){
			// Subtracts one from the score
			score.textContent = Number(score.textContent) - 1;
		}
	}
}

var isHardMode = true,
	hasTimerStarted = false;

// Timers
var cTimer, nRTimer;

var header = document.getElementById("header"),
	rgbDisplay = document.getElementById("rgbDisplay"),
	score = document.getElementById("score"),
	countdownTimer = document.getElementById("countdownTimer"),
	newGameBtn = document.getElementById("newGameBtn"),
	easyModeBtn = document.getElementById("easyModeBtn"),
	hardModeBtn = document.getElementById("hardModeBtn"),
	squares = document.querySelectorAll(".square");

// Click event listener for newGameBtn
newGameBtn.addEventListener("click", function(){
	score.textContent = 0;
	clearInterval(cTimer);
	clearInterval(nRTimer);
	countdownTimer.textContent = 180;
	hasTimerStarted = false;

	header.style.backgroundColor = "#616A6B";
	result.textContent = "";

	var numberOfSquares = isHardMode ? squares.length : 3;

	for(var counter = 0; counter < numberOfSquares; counter++){
		// Initializes the squares' background color as a random color
		squares[counter].style.backgroundColor = getRandomColor();
		squares[counter].addEventListener("click", squares_Click);
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, numberOfSquares - 1)].style.backgroundColor;
});

// Click event listener for easyModeBtn
easyModeBtn.addEventListener("click", function(){
	isHardMode = false;

	score.textContent = 0;
	clearInterval(cTimer);
	clearInterval(nRTimer);
	countdownTimer.textContent = 180;
	hasTimerStarted = false;

	header.style.backgroundColor = "#616A6B";
	result.textContent = "";

	easyModeBtn.classList.add("selected");
	hardModeBtn.classList.remove("selected");

	for(var counter = 0; counter < squares.length; counter++){
		if(counter < 3){
			// Initializes the first three squares' background color as a random color
			squares[counter].style.backgroundColor = getRandomColor();
			squares[counter].addEventListener("click", squares_Click);
		}
		else{
			// Hides the bottom three squares
			squares[counter].style.backgroundColor = "#232323";
			// Disables the bottom three squares
			squares[counter].removeEventListener("click", squares_Click);
		}
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, 2)].style.backgroundColor;
});

// Click event listener for hardModeBtn
hardModeBtn.addEventListener("click", function(){
	isHardMode = true;

	score.textContent = 0;
	clearInterval(cTimer);
	clearInterval(nRTimer);
	countdownTimer.textContent = 180;
	hasTimerStarted = false;

	header.style.backgroundColor = "#616A6B";
	result.textContent = "";

	easyModeBtn.classList.remove("selected");
	hardModeBtn.classList.add("selected");

	for(var counter = 0; counter < squares.length; counter++){
		squares[counter].style.backgroundColor = getRandomColor();
		squares[counter].addEventListener("click", squares_Click);
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, 5)].style.backgroundColor;
});

var numberOfSquares = isHardMode ? squares.length : 3;

// Adds the click event listener to the squares
for(var counter = 0; counter < numberOfSquares; counter++){
	squares[counter].addEventListener("click", squares_Click);
}

hardModeBtn.click();