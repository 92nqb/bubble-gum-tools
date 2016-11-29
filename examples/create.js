const create = require('../lib/bubble-gum-tools').create;

const nestedArray = create([0, 2, 0], 'bar');
console.log(nestedArray); // => [ [ , , [ 'bar' ] ] ]

const nestedObject = create(['root', 'foo', 'bar'], 'bar');
console.log(nestedObject); // => { root: { foo: { bar: 'bar' } } }

const mixed = create([0, 'nested', 'key'], 'value');
console.log(mixed); // => [ { nested: { key: 'value' } } ]
