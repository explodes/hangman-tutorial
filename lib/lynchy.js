
function Lynchy (initialLives) {
	this.life = initialLives;
}

Lynchy.prototype.catsluck = function () {
	this.life--;
}

Lynchy.prototype.print = function () {
	if (this.life > 1) {
		console.log("Lynchy has " + this.life + " lives left.");
	} else if (this.life == 1) {
		console.log("Lynchy is about to die! Last chance!");
	} else {
		console.log("Lynchy is dead... R.I.P.");
	}
};

Lynchy.prototype.isDead = function () {
	return this.life < 1;
}

module.exports = Lynchy;
