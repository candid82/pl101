var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs');

var data = fs.readFileSync('scheem.peg', 'utf-8');
var parse = PEG.buildParser(data).parse;


assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("(a b (+ 1 2))"), ["a", "b", ["+", "1", "2"]] );
