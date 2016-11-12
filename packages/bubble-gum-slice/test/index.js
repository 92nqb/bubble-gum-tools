const tape = require('tape');
const bubbleGumSlice = require('../src');

tape('bubble-gum-slice - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumSlice, 'function', 'should be a function');
  t.is(bubbleGumSlice.length, 2, 'should receive three params: "target", "config"');
});

tape('slice(target, config) - base', t => {
  t.plan(2);
  const testObj = {
    a: 'a'
    b: 'b'
    deep: {
      deep1: 1,
      deep2: 2,
    },
  };
  t.same(bubbleGumSlice(testObj, [{ path: ['a'] }]), { a: 'a' }, 'should create the new object');
  t.same(bubbleGumSlice(testObj, [
    { path: ['a'] },
    { path: ['deep', 'deep1'] }
  ]), {
    a: 'a',
    deep: { deep1: 1 },
   }, 'should create the new object');

   t.end();
});

tape('slice(target, config) - working with arrays', t => {

});

tape('slice(target, config) - rename path with "newPath" property in config param', t => {

});

tape('slice(target, config) - special cases', t => {

});

tape('slice(target, config) - throws a exception', t => {

});
