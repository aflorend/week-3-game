var wordBank = "definition,column,assessment,gradient,midnight,fresh,cathedral,behavior,root,anger,consumer,player,small,wording,petty,sandwich,oven,profound,mushroom,disability,shape,kneel,fast,ring,waste,pipe,extract,beautiful,merit,economics,stab,quarrel,noise,public,repetition,dilemma,real,copy,hierarchy,concrete,inflation,mutation,confession,collapse,tablet,cut,sensitive,size,light,gold,strong,headline,essential,perfume,fool around,access,belief,sofa,agriculture,explicit,struggle,settle,calm,spider,replace,heat,productive,series,appearance,wound,plain,appeal,fashion,snuggle,basic,arrangement,fold,triangle,pen,genetic,advocate,research,integrity,post,maze,surgeon,bus,halt,citizen,message,snarl,order,loose,oppose,flexible,timber,customer,mile,conclusion,reconcile";

var wordList = [];

var currentWord = "";

var guess = "";

var match = false;

var wrongGuess = "";

var duplicateGuess = false;

var guessList = [];

var correctList = [];

var wrongList = [];

var wordScore = correctList.length;

var guessCount = 15;

function guessMath() {guessCount = 15 - wrongList.length;};

var wins = 0;

var losses = 0;

var wordLetters = [];

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

//Event listener for user keypress, stores guesses into a guess list array.
document.onkeyup = function(event) {
	match = false;
	guess = event.key.toLowerCase();
	guessList.push(guess);
	document.getElementById("guessRemain").innerHTML = guessCount;

//Looping to check the previous responses to ensure there are no duplicate guesses and removes dupes from array.
	for (i = 0; i < (guessList.length - 1); i++) {
		duplicateGuess = false;
		if (guess === guessList[i]) {
			duplicateGuess = true;
			guessList.splice(guessList.length - 1);
		};
	};

//Looping to compare guess to letters in current word.
	for (i = 0; i < wordLetters.length; i++) {

//If statement to find matches between non-duplicate guess and current word.
		if (guess === wordLetters[i] && duplicateGuess === false) {

//Removes hidden class, adds revealed class, updates word score.
			match = true;
			correctList.push(guess);
			document.getElementById("letterNum" + i).className = "letterBox revealed";
			wordScore = correctList.length;
		};
	};

//If no matches found, add to wrong list and update guess count.
		if (duplicateGuess === false && match === false) {
			wrongList.push(guess);
			guessMath();
			document.getElementById("guessRemain").innerHTML = guessCount;
			document.getElementById("badGuesses").innerHTML = "<div class='guessBox'>" + wrongList + "</div>";
		};
	};

// If all letters are correctly guessed, plays song, animation, congratulates player, asks if they want to reset.
// 	if (wordScore === wordLetters.length) {
// 		document.getElementById("resetButton").innerHTML
// 	};

//If no guesses remian, game is over.
	

wordBankSplit();
wordGen();
wordSplit();
lettersPrint();