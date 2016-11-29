const set = require('../lib/bubble-gum-tools').set;

const target = {
  root: {
    foo: 'bar',
  },
  arr: [[
    ['baz'],
  ]],
};

// set property in object
set(target, ['root', 'foo'], 'newbar');
console.log(target.root.foo); // => 'newbar'

// set property in array
set(target, ['arr', 0, 0, 0], 'newbaz');
console.log(target.arr[0][0][0]); // => 'newbaz'

set(target, ['root', 'foo2'], 'foo2');
console.log(target.root.foo2); // => 'foo2'

set(target, ['arr', 0, 0, 1], 'newbaz2');
console.log(target.arr[0][0][1]); // => 'newbaz2'
