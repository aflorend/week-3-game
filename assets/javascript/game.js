//Declaring variables.
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var wordBank = "Mac Demarco,Bon Iver,Grimes,Tame Impala,Sufjan Stevens,Sleater Kinney,Father John Misty,Caribou,Spoon,Real Estate,Arcade Fire,LCD Soundsystem,Animal Collective";

var wordList = [];

var currentWord = "";

var wordLetters = [];

var wins = 0;

var losses = 0;

//Reset function for endgame or new word.
var reset = function() {

//Reset variables.
	hangman.guess = "";

	hangman.match = false;

	hangman.duplicateGuess = false;

	hangman.guessList = [];

	hangman.correctList = [];

	hangman.wrongList = [];

	hangman.wordScore = 0;

	hangman.guessCount = 15;

	//Separate words into an array from a large, single string of comma separated words.	
	var wordBankSplit = function() {
			wordList = wordBank.split(",");
		};

	//Generate random word from word list and make lower case.
	var wordGen = function() {
		currentWord = wordList[Math.floor(Math.random() * wordList.length)];
	};

	//Split current word into letters.
	var wordSplit = function() {
		wordLetters = currentWord.toUpperCase().split("");
	};

	//Empties previous letters/guesses/win/loss messages.
	document.getElementById("letters").innerHTML = "";
	hangman.wordMath();
	document.getElementById("correctGuesses").innerHTML = "Correct guesses: " + hangman.wordScore;
	hangman.guessMath();
	document.getElementById("guessRemain").innerHTML = "Remaining guesses: " + hangman.guessCount;
	document.getElementById("badGuesses").innerHTML = "<div class='guessBox'>" + hangman.wrongList + "</div>";
	document.getElementById("badGuesses").innerHTML = "";
	document.getElementById("win").innerHTML = "";
	document.getElementById("lose").innerHTML = "";

	//Insert each letter from the current word into the page and sets initial styling to be hidden.
	var lettersPrint = function() {
		for (i = 0; i < wordLetters.length; i++) {
			document.getElementById("letters").innerHTML += "<div class='letterBorder'><div class='letterBox hidden' id='letterNum" + i + "'>" + wordLetters[i] + "</div></div>";
			//Reveals spaces.
			if (wordLetters[i] === " ") {
				document.getElementById("letterNum" + i).className = "letterBox revealed";
				hangman.correctList.push(wordLetters[i]);
			};
		};
	};
		wordBankSplit();
		wordGen();
		wordSplit();
		lettersPrint();

	//Restarts event listener that was turned off after winning or losing.
	document.onkeyup = function(event) {
		if (alphabet.indexOf(event.key.toUpperCase()) >= 0) {
		hangman.gameGo();
		}
	}
};

//Game object.
var hangman = {

	guess: "",

	match: false,

	duplicateGuess: false,

	guessList: [],

	correctList: [],

	wrongList: [],

	wordScore: 0,

	wordMath: function() {this.wordScore = this.correctList.length},

	guessCount: 15,

	guessMath: function() {this.guessCount = 15 - this.wrongList.length},

	wins: 0,

	losses: 0,

//Restricts key to alphabet. Sets initial false states for match and duplicate. 
	gameGo: function() {
		this.guess = event.key.toUpperCase();
		this.match = false;
		this.duplicateGuess = false;

		//First, check for non-empty array, then compare previous responses to ensure no duplicate guesses.
		if (this.guessList.length < 1) {
			this.duplicateGuess = false;
		}
		else if (this.guessList.indexOf(this.guess) >= 0) {
			this.duplicateGuess = true;
		};

		//Looping to compare guess to letters in current word.
		for (i = 0; i < wordLetters.length; i++) {

			//If statement to find matches between non-duplicate guess and current word.
			if (this.guess === wordLetters[i] && this.duplicateGuess === false) {

				//Removes hidden class, adds revealed class, updates word score.
				this.match = true;
				this.guessList.push(this.guess);
				this.correctList.push(this.guess);
				document.getElementById("letterNum" + i).className = "letterBox revealed";
				this.wordMath();
				document.getElementById("correctGuesses").innerHTML = "Correct guesses: " + this.wordScore;
				};
			};

		//If no matches found, add to wrong list and update guess count.
		if (this.duplicateGuess === false && this.match === false) {
			this.guessList.push(this.guess);
			this.wrongList.push(this.guess);
			this.guessMath();
			document.getElementById("guessRemain").innerHTML = "Remaining guesses: " + this.guessCount;
			document.getElementById("badGuesses").innerHTML = "<div class='guessBox'>" + this.wrongList + "</div>";
		};

		// If all letters are correctly guessed, plays song, animation, congratulates player, asks if they want to reset.
		if (this.wordScore === wordLetters.length && this.wordScore !== 0) {
			document.getElementById("win").innerHTML = "Congratulations! Press 'Reset' if you want to try another word.";
			wins++;
			document.getElementById("winsNum").innerHTML ="Wins: " + wins;
			//Prevent more guesses.
			document.onkeyup = function (event) {
 		    return false;
			}
		};

		//If no guesses remain, game is over.
		if (this.guessCount === 0) {
			document.getElementById("lose").innerHTML = "Sorry! The word was \"" + currentWord + "\". You don't have any more guesses. Press 'Reset' and try again!";
			losses++;
			document.getElementById("loseNum").innerHTML ="Losses: " + losses;
			//Prevent more guesses.
			document.onkeyup = function (event) {
 		    return false;
			}
		};
	}
};

//Event listener for user key, restricts to letters. Starts game function inside of hangman object.
document.onkeyup = function(event) {
	if (alphabet.indexOf(event.key.toUpperCase()) >= 0) {
		hangman.gameGo();
	};
};

reset();