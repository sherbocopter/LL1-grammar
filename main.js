/*
3.Sa se scrie un program care implementeaza algoritmul pentru gramatici LL(1).
Programul primeste la intrare elementele unei gramatici independente de context,
nerecursiva la stanga, oarecare. Programul determina tabela de analiza sintactica
asociata si decide daca gramatica data este LL(1). In caz afirmativ, programul
permite citirea unui nr oarecare de siruri peste alfabetul terminalilor. Pentru
fiecare sir terminal se determina, pe baza tabelei de analiza sintactica obtinuta,
daca este in limbajul generat de gramatica respectiva iar in caz afirmativ se
afiseaza derivarea sa stanga (o succesiune de numere, fiecare numar reprezintand
numarul productiei stangi aplicate).
*/

`use strict`

var Input = require('./input.js');
var Grammar = require('./grammar.js');

var grammarData = Input.grammarData();
Grammar.loadData(grammarData);

var isLL1 = Grammar.checkLL1();

if (isLL1) {
	var td = Grammar.getTranslatorData();

	console.log('----- Grammar productions:');
	for (var i = 0; i < td.productions.length; ++i) {
		var prod = td.productions[i];
		console.log('\t' + i + '. ' + prod.l + ' -> ' + prod.r);
	}

	var words = Input.grammarInput();
	for (var i = 0; i < words.length; ++i) {
		var word = words[i];

		console.log('--- Parsing: ' + word);

		var res = Grammar.checkWord(word);
		if (res === false) {
			console.log(' > failure');
		} else {
			console.log(' > success');
			console.log(' > ' + res);
		}
	}
} else {
	console.log('----- Grammar is not LL(1)');
}