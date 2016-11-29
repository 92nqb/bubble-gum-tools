const slice = require('../lib/bubble-gum-tools').slice;

const target = {
  root: { foo: 'bar' },
  arr: [[['baz']]],
};

const sliced1 = slice(target, [{
  path: ['root', 'foo']
}]);
console.log(sliced1); // => { root: { foo: 'bar' } }

const sliced2 = slice(target, [{
  path: ['root', 'foo'],
  newPath: ['bar'],
}]);
console.log(sliced2); // => { bar: 'bar' }

const sliced3 = slice(target, [{
  path: ['root', 'foo'],
  newPath: [0],
}]);
console.log(sliced3); // => { '0': 'bar' }

const sliced4 = slice(target, [{
  path: ['arr', 0, 0, 0],
  newPath: ['baz'],
}, {
  path: ['root', 'foo'],
  newPath: ['bar'],
}]);
console.log(sliced4); // => { baz: 'baz', bar: 'bar' }
