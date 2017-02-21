var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var wordBank = "definition,column,assessment,gradient,midnight,fresh,cathedral,behavior,root,anger,consumer,player,small,wording,petty,sandwich,oven,profound,mushroom,disability,shape,kneel,fast,ring,waste,pipe,extract,beautiful,merit,economics,stab,quarrel,noise,public,repetition,dilemma,real,copy,hierarchy,concrete,inflation,mutation,confession,collapse,tablet,cut,sensitive,size,light,gold,strong,headline,essential,perfume,fool around,access,belief,sofa,agriculture,explicit,struggle,settle,calm,spider,replace,heat,productive,series,appearance,wound,plain,appeal,fashion,snuggle,basic,arrangement,fold,triangle,pen,genetic,advocate,research,integrity,post,maze,surgeon,bus,halt,citizen,message,snarl,order,loose,oppose,flexible,timber,customer,mile,conclusion,reconcile";

var wordList = [];

var wordLetters = [];

var currentWord = "";

var guess = "";

var match = false;

var duplicateGuess = false;

var guessList = [];

var correctList = [];

var wrongList = [];

var wordScore = 0;

function wordMath() {wordScore = correctList.length};

var guessCount = 15;

function guessMath() {guessCount = 15 - wrongList.length;};

var wins = 0;

var losses = 0;

//Separate words into an array from a large, single string of comma separated words.
function wordBankSplit() {
	wordList = wordBank.split(",");
};

//Generate random word from word list and make lower case.
function wordGen() {
	currentWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
};

//Split current word into letters.
function wordSplit() {
	wordLetters = currentWord.split("");
};

//Insert each letter from the current word into the page and set initial styling to be hidden.
function lettersPrint() {
	for (i = 0; i < wordLetters.length; i++) {
		document.getElementById("letters").innerHTML += "<div class='letterBox hidden' id='letterNum" + i + "'>" + wordLetters[i] + "</div>";
	};
};

//Event listener for user key. Restricts key to alphabet. Sets initial false states for match and duplicate.
document.onkeyup = function(event) {
	if (alphabet.indexOf(event.key.toLowerCase()) >= 0) {
		guess = event.key.toLowerCase();
		match = false;
		duplicateGuess = false;
	}

//First, check non-empty array and the previous responses to ensure there are no duplicate guesses.
	if (guessList.length < 1) {
		duplicateGuess = false;
	}
	else if (guessList.indexOf(guess) >= 0) {
		duplicateGuess = true;
	};

//Looping to compare guess to letters in current word.
	for (i = 0; i < wordLetters.length; i++) {

//If statement to find matches between non-duplicate guess and current word.
		if (guess === wordLetters[i] && duplicateGuess === false) {

//Removes hidden class, adds revealed class, updates word score.
			match = true;
			guessList.push(guess);
			correctList.push(guess);
			document.getElementById("letterNum" + i).className = "letterBox revealed";
			wordMath();
			document.getElementById("correctGuesses").innerHTML = "Correct guesses: " + wordScore;
		};
	};

//If no matches found, add to wrong list and update guess count.
		if (duplicateGuess === false && match === false) {
			guessList.push(guess);
			wrongList.push(guess);
			guessMath();
			document.getElementById("guessRemain").innerHTML = "Remaining guesses: " + guessCount;
			document.getElementById("badGuesses").innerHTML = "<div class='guessBox'>" + wrongList + "</div>";
		};

// If all letters are correctly guessed, plays song, animation, congratulates player, asks if they want to reset.
	if (wordScore === wordLetters.length && wordScore !== 0) {
		document.getElementById("win").innerHTML = "Congratulations! Press 'Reset' if you want to try another word.";
	};

//If no guesses remain, game is over.
	if (guessCount === 0) {
		document.getElementById("lose").innerHTML = "Sorry! You don't have any more guesses. Press 'Reset' and try again!";
	}
};

wordBankSplit();
wordGen();
wordSplit();
lettersPrint();