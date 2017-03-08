// javascript logic for hangman game

//UNCOMMENT ALL CONSOLE.LOGS TO ACCESS "DEVELOPER MODE"

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

var wordsList = [
	"cat",
	"daylight",
	"eggs",
	"bacon",
	"toast",
	"tea",
	"dog",
	"monday",
	"wednesday",
	"friday",
	"javascript",
	"coding",
	"programming",
	"house",
	"pool",
	"table",
	"sky",
	"earth",
	"coffee",
	"incense",
	"fork",
	"parameter",
	"argument",
	"element",
	"scope",
	"variable",
	"object",
	"function",
	"loop",
	"array",
	"lassitude",
	"buttock",
	"longitude",
	"bifurcation"
	];



var chosenWord = "";
var numBlanks = 0;

var userGuess = "";
var winCounter = 0;
var lossesCounter = 0;
var numGuesses = 10;

var wrongGuesses = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var blanks = " _ ";



//Game starts. A new word is randomly selected from list,
//it's length is determined, and a array is filled with a number
//of blanks equivalent to the lenght of the selected word.
startGame(wordsList);

	// console.log(chosenWord.join(""));
	// console.log(blanksAndSuccesses);
	// console.log(numBlanks);

displayData();

	// Catching user input
document.onkeyup = function() {

	//User input is caught and assigned to userGuess variable
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// console.log("User guessed: " + userGuess);


	// NOW THAT WE'VE SUCCESFULY PICKED A RANDOM WORD AND TAKEN 
	// USER INPUT, WE HAVE TO RUN THROUGH THE LETTERS OF THE WORD
	// AND COMPARE WITH OUR USER INPUT TO SEE IF WE GET A MATCH

	//the checkForMatch functions does just that. we pass it the
	//user input and the chosen word so that it may compare.
	checkForMatch(chosenWord, userGuess);


	//Updates data on real-time as user continues to guess letters
    displayData();

    //Checks if the user has won
    checkForWin(blanksAndSuccesses, chosenWord, wordsList);

     // -----

//end of document.onkeyup
}
	
	 



	// ------------ FUNCTIONS -------------

// The pickWord method returns a word from the wordsList array. 
// Not only does it return the word, but it also splits it.
function pickWord(words){
	//Picks a word and splits it
	var word = words[Math.floor(Math.random()*words.length)];
	return word.split("");
}


//The startGame function
	// - picks a word at random from the wordsList array
	// - determines the number of blanks to be put into the blanksAndSuccesses
	// - generates the blanksAndSuccesses array
	// - resets all values except wins and losses
		// - resets numGuesses
		// - reasigns numBlanks
		// - empties wrongGuessesarray
function startGame(list){

	chosenWord = pickWord(list);
	numBlanks = chosenWord.length;
	generateBlanksAndSuccesses(numBlanks);
	numGuesses = 10;


	

	//the length of the array is calculated and assigned into a new variable
	//before entering the loop because if we used "wrongGuesses.pop()" for the 
	//conditional of the loop, then the length of the array would decrease with
	//each iteration and we might miss some letters. We want to make sure it is
	//completely empty.
	var newLength = wrongGuesses.length;

	//flushes the wrongGuesses array based on the number of letters
	//it carried. in other words, it deletes however many letters had
	//been guessed incorrectly
	for (var i = 0; i < newLength; i++) {
		wrongGuesses.pop();
	};

}

function generateBlanksAndSuccesses(num){

	//Fills blanksAndSuccesses array with blanks. 
	for (var i = 0; i < num; i++) {
		blanksAndSuccesses[i] = blanks;
	};

}

function checkForMatch(choice, guess) {
	//if the guess isn't in the word, add the guess to wrongGuesses
	if (choice.indexOf(guess) === -1) {
			wrongGuesses.push(guess + " ");
			numGuesses--;
			// console.log(blanksAndSuccesses);
	}
	//otherwise, loop over the word and update the corresponding elements of blanksAndSuccesses
	else {
		for (var i = 0; i < choice.length; i++) {
			if (choice[i] === guess) {
				blanksAndSuccesses[i] = choice[i];
				// console.log(blanksAndSuccesses);
			}
		};	
	}
}

// THE CHECK FOR WIN FUNCTION WILL COMPARE A STRING WITH AN ARRAY.
// IT WILL COMPARE THE chosenWord STRING WITH THE blanksAndSuccesses 
// ARRAY. IF CONTENT IS IDENTICAL, THEN YOU WIN. YOU LOSE IF YOU RUN out
// of guesses
function checkForWin(arr, string, options){

	var score = 0;
    var numOfLetters = arr.length;

     // Checks for win by iterating though each array, comparing all indexes
     // to see if all letters match
     for (var i = 0; i < arr.length; i++) {
     	

     	if (arr[i] === string[i]) {

     		//increments the score variable by one
     		//each time a letter matches
     		score++;

     		if (score === numOfLetters){
     			var win = true;
     		};
     	} 
     	else{
     		win = false;
     	};
     };

     if (win){
     	
     	winCounter++;
     	// console.log("Wins: " + winCounter);

     	targetDiv5 = document.getElementById("numberWins");
     	targetDiv5.innerHTML = winCounter;
     	
     	//this makes sure that the blanksAndSuccesses array is 
     	//emptied before the game starts over
		for (var i = 0; i < blanksAndSuccesses.length; i++) {
		blanksAndSuccesses.pop();
		};

		//alerts the user of the word they just guessed
		alert("Congratulations! You guessed the word " + "'" + chosenWord.join("") + "'");

		//Game starts over again with data refreshed on screen
     	startGame(options);
     	displayData();
     	// console.log(blanksAndSuccesses.join(""));

     }
     else{

     	if(numGuesses === 0){
     		lossesCounter++;

     		targetDiv6 = document.getElementById("numberLosses");
     		targetDiv6.innerHTML = lossesCounter;


     		alert("Sorry, you've run out of guesses x___x Don't give up, try again!");
     		// console.log("Losses: " + lossesCounter);
     		startGame(options);
     		displayData();
     	}
     };

}


function displayData(){

	// var targetDiv1 = document.getElementById("blanks");
	var targetDiv2 = document.getElementById("lettersGuessed");
	var targetDiv3 = document.getElementById("wrongGuesses");
	var targetDiv4 = document.getElementById("numGuesses");
	var targetDiv5 = document.getElementById("numberWins");
	var targetDiv6 = document.getElementById("numberLosses");


     // targetDiv1.innerHTML = chosenWord.join("");
     targetDiv2.innerHTML = blanksAndSuccesses.join("");
     targetDiv3.innerHTML = wrongGuesses.join("");
     targetDiv4.innerHTML = numGuesses;
}

