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
console.log(grammarData);

var isLL1 = Grammar.checkLL1();

console.log(isLL1);

Grammar.checkWords(Input.grammarInput);