const goto = require('../lib/bubble-gum-tools').goto;

const target = {
  root: {
    foo: 'bar',
  },
  arr: [[
    ['baz'],
  ]],
};

goto(['root', 'foo'], (result) => {
  const {
    indexPath,
    previous,
    target,
    current,
    key,
  } = result;
  console.log(indexPath);  // =>  1
  console.log(previous);  // => { foo: 'bar' }
  console.log(target);  // => { root: { foo: 'bar' }, arr: [ [ [Object] ] ] }
  console.log(current);  // => bar
  console.log(key);  // => foo
})(target);

const result = goto(['root', 'foo'], ({current, key}) => (current + '-' + key))(target);
console.log(result); // => bar-foo
