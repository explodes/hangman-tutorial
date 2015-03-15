var fs = require('fs');

var wordList = fs.readFileSync("/usr/share/dict/words").toString().split("\n");
   ;

function generate() {
	var index = Math.floor(Math.random() * wordList.length);
	return wordList[index];
}

exports.generate = generate;
