`use strict`

var td = null;
var first = {};
var follow = {};

Array.prototype.pushUnique = function(element) {
	if (this.indexOf(element) < 0)
		this.push(element);
}

Array.prototype.concatUnique = function(array) {
	for (var i = 0; i < array.length; ++i)
		this.pushUnique(array[i]);
}

var doTable = function() {
	// first
	for (var i = 0; i < td.nonTerminals.length; ++i) {
		var nonTerminal = td.nonTerminals[i];
		findFirst(nonTerminal);
	}
	console.log(first);

	// follow
	for (var i = 0; i < td.nonTerminals.length; ++i) {
		var nonTerminal = td.nonTerminals[i];
		findFollow(nonTerminal);
	}
	console.log(follow);
}

var findFirst = function(nonTerminal) { // lazy af
	if (first.hasOwnProperty(nonTerminal))
		return first[nonTerminal];

	var productions = td.productions;
	var f = [];

	// iterate through productions
	for (var i = 0; i < productions.length; ++i) {
		var production = productions[i];

		// skip the ones not related to the nonTerminal
		if (production.l != nonTerminal)
			continue;

		var cnt = 0;
		do {
			var possibleFirst = production.r[cnt];
			if (td.nonTerminals.indexOf(possibleFirst) < 0)
			{
				f.pushUnique(possibleFirst);
				break;
			}
			else
			{
				var possibleFirsts = findFirst(possibleFirst);
				if (possibleFirsts.indexOf(td.lambda) < 0) {
					f.concatUnique(possibleFirsts);
					break;
				} else {
					var clone = possibleFirsts.slice();
					clone.splice(possibleFirsts.indexOf(td.Lambda), 1);
					f.concatUnique(clone);
					cnt++;
				}
			}
		} while (cnt < production.r.length);

		if (cnt === production.r.length) {
			f.pushUnique(td.lambda);
		}
	}

	first[nonTerminal] = f;
	return first[nonTerminal];
}

var findFollow = function(nonTerminal) {
	if (follow.hasOwnProperty(nonTerminal))
		return follow[nonTerminal];

	var productions = td.productions;
	var f = [];

	if (nonTerminal === td.startSymbol)
		f.push('$');

	for (var i = 0; i < productions.length; ++i) {
		var prod = productions[i];
		var ind = prod.r.indexOf(nonTerminal);

		if (ind >= 0) {
			var cnt = ind + 1;
			while (cnt < prod.r.length) {
				var possibleFollow = prod.r[cnt];
				if (td.nonTerminals.indexOf(possibleFollow) < 0) {
					f.pushUnique(possibleFollow);
					break;
				} else {
					var possibleFollows = first[possibleFollow];
					if (possibleFollows.indexOf(td.lambda) < 0) {
						f.concatUnique(possibleFollows);
						break;
					} else {
						var clone = possibleFollows.slice();
						clone.splice(possibleFollows.indexOf(td.Lambda), 1);
						f.concatUnique(clone);
						cnt++;
					}
				}
			}
			if (cnt === prod.r.length && prod.l !== nonTerminal) {
				f.concatUnique(findFollow(prod.l));
			}
		}
	}

	follow[nonTerminal] = f;
	return follow[nonTerminal];
}

var checkLL1 = function() {

}

var checkWords = function() {

}

module.exports = {
	loadData: function(translatorData) {
		td = translatorData;
	},
	getTranslatorData: function() {
		return td;
	},
	doTable: doTable,
	checkLL1: checkLL1,
	checkWords: checkWords
}