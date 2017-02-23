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
	document.getElementById("guessRemain").innerHTML = "Guesses left: " + hangman.guessCount;
	document.getElementById("badGuesses").innerHTML = "Wrong letters: ";
	document.getElementById("win").innerHTML = "";
	document.getElementById("lose").innerHTML = "";

	//Insert each letter from the current word into the page and sets initial character to underscores to hide them.
	var lettersPrint = function() {
		for (i = 0; i < wordLetters.length; i++) {
			document.getElementById("letters").innerHTML += "<div class='letterBox' id='letterNum" + i + "'>_</div>";
			//Reveals spaces.
			if (wordLetters[i] === " ") {
				document.getElementById("letterNum" + i).innerHTML = " ";
				hangman.correctList.push(" ");
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
		};
	};
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

				//Replaces underscore with correctly guessed character, updates word score.
				this.match = true;
				this.guessList.push(this.guess);
				this.correctList.push(this.guess);
				document.getElementById("letterNum" + i).innerHTML = wordLetters[i];
				this.wordMath();
				};
			};

		//If no matches found, add to wrong list and update guess count.
		if (this.duplicateGuess === false && this.match === false) {
			this.guessList.push(this.guess);
			this.wrongList.push(this.guess);
			this.guessMath();
			document.getElementById("guessRemain").innerHTML = "Guesses left: " + this.guessCount;
			document.getElementById("badGuesses").innerHTML = "<div class='guessBox'>Wrong letters: " + this.wrongList + "</div>";
		};

		// If all letters are correctly guessed, plays song, animation, congratulates player, asks if they want to reset.
		if (this.wordScore === wordLetters.length && this.wordScore !== 0) {
			document.getElementById("win").innerHTML = "Stupdendous! Press the \"New Band\" button to keep playing.";
			wins++;
			document.getElementById("winsNum").innerHTML ="Wins: " + wins;
			//Prevent more guesses.
			document.onkeyup = function (event) {
 		    return false;
			}
		};

		//If no guesses guessRemainin, game is over.
		if (this.guessCount === 0) {
			document.getElementById("lose").innerHTML = "The band was \"" + currentWord + "\". Bummer. Press the \"New Band\" button and try again!";
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