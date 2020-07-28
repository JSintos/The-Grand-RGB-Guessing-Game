// This function returns a random number from min to max (inclusive)
function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function returns a random color as a string
function getRandomColor(){
	return "rgb(" + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ")";
}

// This function changes the colors of the squares to the picked color after a successful guess
function changeSquareColors(){
	// If it is on hard mode, the number of squares is 6, otherwise 3.
	var numberOfSquares = isHardMode ? squares.length : 3;

	for(var counter = 0; counter < numberOfSquares; counter++){
		squares[counter].style.backgroundColor = rgbDisplay.textContent;
	}
}

// This function handles the squares' click event
function squares_Click(e){
	// Checks if the clicked square's background color is the same as the chosen color
	if(e.currentTarget.style.backgroundColor == rgbDisplay.textContent){
		// Changes the header's background color to the chosen color
		header.style.backgroundColor = rgbDisplay.textContent;
		newGameBtn.textContent = "Play again?";
		result.textContent = "Correct!";
		changeSquareColors();
	}
	else{
		result.textContent = "Try again.";
		// Hides the incorrect square
		e.currentTarget.style.backgroundColor = "#232323";
	}
}

// Flag that tells if the game is in hard mode
var isHardMode = true;

var header = document.getElementById("header"),
	rgbDisplay = document.getElementById("rgbDisplay"),
	newGameBtn = document.getElementById("newGameBtn"),
	easyModeBtn = document.getElementById("easyModeBtn"),
	hardModeBtn = document.getElementById("hardModeBtn"),
	squares = document.querySelectorAll(".square");

// Click event listener for newGameBtn
newGameBtn.addEventListener("click", function(){
	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";

	var numberOfSquares = isHardMode ? squares.length : 3;

	// Initializes the squares' background color as a random color
	for(var counter = 0; counter < numberOfSquares; counter++){
		squares[counter].style.backgroundColor = getRandomColor();
	}

	// Picks a random square's background color as the chosen color
	rgbDisplay.textContent = squares[getRandomNumber(0, numberOfSquares - 1)].style.backgroundColor;
});

// Click event listener for easyModeBtn
easyModeBtn.addEventListener("click", function(){
	isHardMode = false;

	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";
	result.textContent = "";

	easyModeBtn.classList.add("selected");
	hardModeBtn.classList.remove("selected");

	// Hides and disables the bottom three squares
	for(var counter = 0; counter < squares.length; counter++){
		if(counter < 3){
			squares[counter].style.backgroundColor = getRandomColor();
		}
		else{
			squares[counter].style.backgroundColor = "#232323";
			squares[counter].removeEventListener("click", squares_Click);
		}
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, 2)].style.backgroundColor;
});

// Click event listener for hardModeBtn
hardModeBtn.addEventListener("click", function(){
	isHardMode = true;

	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";
	result.textContent = "";

	easyModeBtn.classList.remove("selected");
	hardModeBtn.classList.add("selected");

	// Reveals and enables all of the squares
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