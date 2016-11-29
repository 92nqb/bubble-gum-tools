const has = require('../lib/bubble-gum-tools').has;

const target1 = {
  root: {
    foo: 'bar',
  },
  arr: [[
    ['baz'],
  ]],
};

// Basic usage

const existsBar = has(target1, ['root', 'foo']);
console.log(existsBar); // => true

const existsBaz = has(target1, ['arr', 0, 0, 0]);
console.log(existsBaz); // => true

const noExists = has(target1, ['no', 'defined']);
console.log(noExists); // => false

const target2 = {
  root: {
    zero: 0,
    null: null,
    empty: '',
    false: false,
  },
};

// No stric mode

const noStrictMode = false;
const noStrictZero = has(target2, ['root', 'zero'], noStrictMode);
console.log(noStrictZero); // => false
const noStrictNull = has(target2, ['root', 'null'], noStrictMode);
console.log(noStrictNull); // => false
const noStrictEmpty = has(target2, ['root', 'empty'], noStrictMode);
console.log(noStrictEmpty); // => false
const noStrictFalse = has(target2, ['root', 'false'], noStrictMode);
console.log(noStrictFalse); // => false



// Stric mode

const strictMode = true;
const strictZero = has(target2, ['root', 'zero'], strictMode);
console.log(strictZero); // => true
const strictEmpty = has(target2, ['root', 'empty'], strictMode);
console.log(strictEmpty); // => true
const strictNull = has(target2, ['root', 'null'], strictMode);
console.log(strictNull); // => false
const strictFalse = has(target2, ['root', 'false'], strictMode);
console.log(strictFalse); // => false
