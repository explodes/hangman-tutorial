// requires
var words = require("./lib/words")
   ,Lynchy = require("./lib/lynchy")
   ,readline = require("readline")
   ;

// game parameters
var FIELD_CHARACTER = "-"
   ,INITIAL_LIVES = 10;

// game variables
var word = words.generate()
   ,wordField = generateField(word)
   ,lynchy = new Lynchy(INITIAL_LIVES)
   ,guesses = []
   ,wrongGuesses = ""
   ,read = readline.createInterface({ input: process.stdin, output: process.stdout })
   ;

// game functions
function generateField (word) {
	return word.replace(/[^\s]/g, FIELD_CHARACTER);
}

function isValidGuess (guess) {
	return  /^\w$/.test(guess);
}

function hasAlreadyGuessed (guess) {
	return guesses.indexOf(guess) != -1;
}

function isGuessCorrect (guess) {
	return word.toLowerCase().indexOf(guess) != -1;
}

function isWordGuessed () {
	return wordField.indexOf(FIELD_CHARACTER) == -1;
}

function putGuessInField (guess) {
	var newField = "";
	for (var index=0, N=word.length; index<N; index++) {
		var wordChar = word.charAt(index);
		if (guess == wordChar.toLowerCase()) {
			newField += wordChar;
		} else {
			newField += wordField.charAt(index);
		}
	}
	wordField = newField;
}

function writePrompt() {
	lynchy.print();
	if (wrongGuesses.length > 0) {
		console.log("You have guessed: " + wrongGuesses);
	}
	console.log(wordField);
	console.log("Enter a guess:");
}

function processGuess (guess) {
	// make sure our guess is expressed as only lower-case characters
	guess = guess.toLowerCase();
	
	console.log("***************************");

	if (!isValidGuess(guess)) {
		// invalid guess
		console.log ("That guess wasn't cool, guess only a single letter or number!");
	} else if (hasAlreadyGuessed(guess)) {
		// duplicate guess
		console.log("Bro, you already guessed that!");
	} else {
		// a guess was made
		guesses.push(guess);

		if (isGuessCorrect(guess)) {
			// correct guess
			console.log ("Nice. Good guess.");
			putGuessInField(guess);
			if (isWordGuessed()) {
				// end game!
				console.log("Congratulations! You're the boss. +1");
				console.log("The word was: " + word);
				process.exit();
			}
		} else {
			// incorrect guess

			if (wrongGuesses.length > 0) {
				wrongGuesses += ", ";
			}
			wrongGuesses += guess.toUpperCase();

			console.log("BZZZT! Wrong! Damn dude, try again.");
			lynchy.catsluck();
			if (lynchy.isDead()) {
				console.log("You killed him. Game over.");
				console.log("The word was: " + word);
				process.exit();
			}
		}
	}
	// print lynchy and field after each user input
	writePrompt();
}

function main () {
	console.log("Welcome to hangman, man.");
	console.log("Save Lynchy's life!");
	writePrompt();
	read.on("line", processGuess);
}

main();

