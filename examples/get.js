const get = require('../lib/bubble-gum-tools').get;

const target = {
  root: {
    foo: 'bar',
  },
  arr: [[
    ['baz'],
  ]],
};

const bar = get(target, ['root', 'foo']);
console.log(bar); // => 'bar'

const baz = get(target, ['arr', 0, 0, 0]);
console.log(baz); // => 'baz'

const noDefaultVal = get(target, ['no', 'defined']);
console.log(noDefaultVal); // => undefined

const defaultVal = get(target, ['no', 'defined'], 'default');
console.log(defaultVal); // => 'default'
