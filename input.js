`use strict`

// var productions = [
// 	{
// 		l: 'S',
// 		r: 'aAB'
// 	},
// 	{
// 		l: 'S',
// 		r: 'B'
// 	},{
// 		l: 'A',
// 		r: 'aA'
// 	},{
// 		l: 'B',
// 		r: 'aS'
// 	},{
// 		l: 'B',
// 		r: 'a'
// 	},{
// 		l: 'A',
// 		r: 'L'
// 	}
// ];

// var productions = [
// 	{
// 		l: 'S',
// 		r: 'Bb'
// 	},
// 	{
// 		l: 'S',
// 		r: 'Cd'
// 	},{
// 		l: 'B',
// 		r: 'aB'
// 	},{
// 		l: 'B',
// 		r: 'L'
// 	},{
// 		l: 'C',
// 		r: 'cC'
// 	},{
// 		l: 'C',
// 		r: 'L'
// 	}
// ];

var productions = [
	{
		l: 'E',
		r: 'Te'
	},
	{
		l: 'e',
		r: '+Te'
	},
	{
		l: 'e',
		r: 'L'
	},
	{
		l: 'T',
		r: 'Ft'
	},
	{
		l: 't',
		r: '*Ft'
	},
	{
		l: 't',
		r: 'L'
	},
	{
		l: 'F',
		r: '_'
	},
	{
		l: 'F',
		r: '(E)'
	}
];

// var productions = [
// 	{
// 		l: 'S',
// 		r: 'ACB'
// 	},
// 	{
// 		l: 'S',
// 		r: 'CbC'
// 	},
// 	{
// 		l: 'S',
// 		r: 'Ba'
// 	},
// 	{
// 		l: 'A',
// 		r: 'da'
// 	},
// 	{
// 		l: 'A',
// 		r: 'BC'
// 	},
// 	{
// 		l: 'B',
// 		r: 'g'
// 	},
// 	{
// 		l: 'B',
// 		r: 'L'
// 	},
// 	{
// 		l: 'C',
// 		r: 'h'
// 	},
// 	{
// 		l: 'C',
// 		r: 'L'
// 	}
// ];

module.exports = {
	grammarData: function() {
		var result = {
			nonTerminals: 'EeTtF',
			terminals: '+*_()',
			productions: productions,
			startSymbol: 'E',
			lambda: 'L'
		}

		return result;
	},
	grammarInput: function() {
		
	}
};