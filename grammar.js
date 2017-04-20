`use strict`

var checkNested = require('./check_nested.js');

var td = null;
var first = {};
var follow = {};
var parsingTable = {};

Array.prototype.pushUnique = function(element) {
	if (this.indexOf(element) < 0)
		this.push(element);
}

Array.prototype.concatUnique = function(array) {
	for (var i = 0; i < array.length; ++i)
		this.pushUnique(array[i]);
}

var checkLL1 = function() {
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

	// parsing table
	return doParsingTable();
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

var doParsingTable = function() {
	for (var i = 0; i < td.nonTerminals.length; ++i) {
		var nonTerminal = td.nonTerminals[i];

		var fi = first[nonTerminal];
		var fo = follow[nonTerminal];

		for (var j = 0; j < td.productions.length; ++j) {
			var prod = td.productions[j];
			if (prod.l !== nonTerminal)
				continue;

			var firsts = getFirsts(prod.r);
			for (var k = 0; k < firsts.length; ++k) {
				var terminal = firsts[k];

				if (terminal === td.lambda) {
					for (var l = 0; l < fo.length; ++l) {
						var canContinue = addToParsingTable(nonTerminal, fo[l], j);
						if (!canContinue)
							return false;
					}
				} else {
					var canContinue = addToParsingTable(nonTerminal, terminal, j);
					if (!canContinue)
						return false;
				}
			}
		}
	}
	
	console.log(parsingTable);
	return true;
}

var addToParsingTable = function(nonTerminal, terminal, ind) {
	if (checkNested(parsingTable, nonTerminal, terminal) === true)
		return false;
	else {
		if (!parsingTable.hasOwnProperty(nonTerminal))
			parsingTable[nonTerminal] = {};
		parsingTable[nonTerminal][terminal] = ind;
	}
	return true;
}

var getFirsts = function(w) {
	var f = [];
	var cnt = 0;

	while (cnt < w.length) {
		var possibleFirst = w[cnt];
		if (td.nonTerminals.indexOf(possibleFirst) < 0) {
			f.pushUnique(possibleFirst);
			break;
		} else {
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
	}
	if (cnt === w.length) {
		f.pushUnique(td.lambda);
	}

	return f;
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
	checkLL1: checkLL1,
	checkWords: checkWords
}