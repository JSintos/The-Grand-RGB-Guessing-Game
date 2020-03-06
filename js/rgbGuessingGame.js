function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(){
	return "rgb(" + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ", " + getRandomNumber(0, 255) + ")";
}

function changeSquareColors(){
	var numberOfSquares = isHardMode ? squares.length : 3;

	for(var counter = 0; counter < numberOfSquares; counter++){
		squares[counter].style.backgroundColor = rgbDisplay.textContent;
	}
}

function squares_Click(e){
	if(e.currentTarget.style.backgroundColor == rgbDisplay.textContent){
		header.style.backgroundColor = rgbDisplay.textContent;
		newGameBtn.textContent = "Play again?";
		result.textContent = "Correct!";
		changeSquareColors();
	}
	else{
		result.textContent = "Try again.";
		e.currentTarget.style.backgroundColor = "#232323";
	}
}

var isHardMode = true;

var header = document.getElementById("header"),
	rgbDisplay = document.getElementById("rgbDisplay"),
	newGameBtn = document.getElementById("newGameBtn"),
	easyModeBtn = document.getElementById("easyModeBtn"),
	hardModeBtn = document.getElementById("hardModeBtn"),
	squares = document.querySelectorAll(".square");

newGameBtn.addEventListener("click", function(){
	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";

	var numberOfSquares = isHardMode ? squares.length : 3;

	for(var counter = 0; counter < numberOfSquares; counter++){
		squares[counter].style.backgroundColor = getRandomColor();
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, numberOfSquares - 1)].style.backgroundColor;
});

easyModeBtn.addEventListener("click", function(){
	isHardMode = false;

	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";
	result.textContent = "";

	easyModeBtn.classList.add("selected");
	hardModeBtn.classList.remove("selected");

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

hardModeBtn.addEventListener("click", function(){
	isHardMode = true;

	header.style.backgroundColor = "#616A6B";
	newGameBtn.textContent = "New Colors";
	result.textContent = "";

	easyModeBtn.classList.remove("selected");
	hardModeBtn.classList.add("selected");

	for(var counter = 0; counter < squares.length; counter++){
		squares[counter].style.backgroundColor = getRandomColor();
		squares[counter].addEventListener("click", squares_Click);
	}

	rgbDisplay.textContent = squares[getRandomNumber(0, 2)].style.backgroundColor;
});

var numberOfSquares = isHardMode ? squares.length : 3;

for(var counter = 0; counter < numberOfSquares; counter++){
	squares[counter].addEventListener("click", squares_Click);
}

hardModeBtn.click();