let numGenerator = 8;
let colors = generateRandomColors(numGenerator);
let container = document.querySelector("container");
let h1 = document.querySelector("h1"); 
let squares = document.querySelectorAll(".square");
let messageDisplay = document.querySelector("#message");
let pickedColor = pickColor();
let colorDisplay = document.querySelector("#color-display");
let resetBtn = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
let navBar = document.querySelector("#navBar");
let score = [];
let fail = [];
let scoreDisplay = document.querySelector("#score");
let gameOverContainer = document.querySelector("#game-over-container");
let gameOverRestartBtn = document.querySelector("#game-over-restart-btn");
let allEqual = arr => arr.every( v => v === arr[0] )
allEqual( [1,1,1,1] )  // true

//CHANGE DIFFICULTY
easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selectedDifficulty");
    hardBtn.classList.remove("selectedDifficulty");
    numGenerator = 4;
    colors = generateRandomColors(numGenerator);
    pickedColor = pickColor();
    colorDisplay.innerHTML = pickedColor;
    fail.length = 0;
    

    for (let i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.backgroundColor = colors [i];
            
        } else {
            squares[i].style.display = "none";
            
        }
        
    }
});

hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selectedDifficulty");
    hardBtn.classList.add("selectedDifficulty");
    numGenerator = 8;
    colors = generateRandomColors(numGenerator);
    pickedColor = pickColor();
    colorDisplay.innerHTML = pickedColor;
    fail.length = 0;

    for (let i = 0; i < squares.length; i++) {
     
        squares[i].style.backgroundColor = colors [i];
        squares[i].style.display = "block";
    }
});

colorDisplay.innerHTML = pickedColor;


gameOverRestartBtn.addEventListener("click", function(){
    messageDisplay.innerHTML = "";

    //generate new colors
    colors = generateRandomColors(numGenerator);

    //pick a new random color from array
    pickedColor = pickColor();

    //change colorDisplay to match picked color
    colorDisplay.innerHTML = pickedColor;

    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }

    fail.length = 0;

    gameOverContainer.style.opacity = "0";
    gameOverContainer.style.zIndex = "-10000";
   
    resetBtn.innerHTML = "New Colors";
    h1.style.backgroundColor = "#232323";
});


resetBtn.addEventListener("click", function(){
    messageDisplay.innerHTML = "";

    //generate new colors
    colors = generateRandomColors(numGenerator);

    //pick a new random color from array
    pickedColor = pickColor();

    //change colorDisplay to match picked color
    colorDisplay.innerHTML = pickedColor;

    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }

    if(resetBtn.innerHTML === "Play again"){
        resetBtn.innerHTML = "New Colors";
        colorDisplay.style.color = "white";
        fail.length = 0;
    }
  
    h1.style.backgroundColor = "#232323";
});

for (let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    //add event listeners to squares
    squares[i].addEventListener("click", function(){
    
    resetBtn.innerHTML = "New Colors"    
    //grab color of clicked square
    let clickedColor = this.style.backgroundColor;

    //CHECK IF CLICKED COLOR IS THE RIGHT COLOR

    if(clickedColor === pickedColor){
        messageDisplay.innerHTML = "Well done!";
        changeColors(clickedColor);
        colorDisplay.style.color = clickedColor;
        resetBtn.innerHTML = "Play again";
        
        //Stop duplicates from getting into score array
        if (score.includes(pickedColor) === false) {
        score.push(pickedColor);
        }
        
        scoreDisplay.innerHTML = `Score: ${score.length}`;
   
    } else {

        this.style.backgroundColor = "#232323";
        messageDisplay.innerHTML = "Try again";
        resetBtn.innerHTML = "New Colors";
        fail.push(clickedColor);
    }

 

    if(fail.length > 2){
        messageDisplay.innerHTML = "";
        resetBtn.innerHTML = "Play again";
        changeColors();
        score.length = 0;
        scoreDisplay.innerHTML = `Score: ${score.length}`;
        gameOverContainer.style.opacity = "1";
        gameOverContainer.style.zIndex = "10000";
        
    }

});
}

//change all colors to right color when clicked

function changeColors(color){
    //loop through all squares
    for (let i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    let random = Math.floor(Math.random() * colors.length)
    return colors[random];

}    
function generateRandomColors(num) {
	//make an array
	let arr = [];
	//add num random colors to arr
	for(let i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
} 

function randomColor() {
	//RED
	let r = Math.floor(Math.random() * 256);
	//GREEN
	let g = Math.floor(Math.random() * 256);
	//BLUE
    let b = Math.floor(Math.random() * 256);
    
	return "rgb(" + r + ", " + g + ", " + b + ")";
}



let highscore = localStorage.getItem("highscore");

if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
else{
    localStorage.setItem("highscore", score);
}



console.log(score.length);