var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs');

var data = fs.readFileSync('scheem.peg', 'utf-8');
var parse = PEG.buildParser(data).parse;


assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("(a b (+ 1 2))"), ["a", "b", ["+", "1", "2"]] );
assert.deepEqual( parse(" ( 1  d (\tasdf \n2 ) ) "), ["1", 'd', ['asdf', '2']]);
assert.deepEqual( parse("(1 2 (1 2) '(1 2 3))"), ['1', '2', ['1', '2'], ['quote', ['1', '2', '3']]]);
assert.deepEqual( parse("(1 2 ;;test\n(1 2)) ;; asdfsdf"), ['1', '2', ['1', '2']]);
