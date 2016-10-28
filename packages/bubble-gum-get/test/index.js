const tape = require('tape');
const bubbleGumGet = require('../src');

tape('bubble-gum-get - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumGet, 'function', 'should be a function');
  t.is(bubbleGumGet.length, 3, 'should receive three params');
})

tape('get(target, path) - basic', t => {
  t.plan(1);
  const b = 'b';
  const testObj = {
    a: { b },
  };
  t.is(bubbleGumGet(testObj, ['a', 'b']), b, 'should be the value in b path');
});

tape('get(target, path) - advance', t => {
  t.plan(4);
  const c = 'c';
  const b = { c };
  const a = { b };
  const testObj = { a };

  t.same(bubbleGumGet(testObj, []), testObj, 'should return the "testObj"');
  t.same(bubbleGumGet(testObj, ['a']), a, 'should be the value in "a" path');
  t.same(bubbleGumGet(testObj, ['a', 'b']), b, 'should be the value in "a, b" path');
  t.is(bubbleGumGet(testObj, ['a', 'b', 'c']), c, 'should be the value in "a, b, c" path');
});

tape('get(target, path) - should be return the undefined', t => {
  t.plan(3);
  const testObj = {
    a: { b: undefined },
  };
  t.is(bubbleGumGet(testObj, ['a', 'b']), undefined, 'should return "undefined"');
  t.is(bubbleGumGet(testObj, ['b']), undefined, 'should return "undefined"');
  t.is(bubbleGumGet(testObj, ['a', 'b', 'c']), undefined, 'should return "undefined"');
});

tape('get(target, path, defaultValue) - should be return the default value', t => {
  t.plan(3);
  const defaultVal = 'DEFAULT';
  const testObj = {
    a: { b: undefined },
  };
  t.is(bubbleGumGet(testObj, ['a', 'b'], defaultVal), defaultVal, 'should return the default value');
  t.is(bubbleGumGet(testObj, ['b'], defaultVal), defaultVal, 'should return the default value');
  t.is(bubbleGumGet(testObj, ['a', 'b', 'c'], defaultVal), defaultVal, 'should return the default value');
});

tape('get(target, path, defaultValue) - throws a exception', t => {
  t.plan(3);
  t.throws(() => bubbleGumGet('', null), new TypeError, 'should throws a exception');
  t.throws(() => bubbleGumGet(undefined, []), new TypeError, 'should throws a exception because the "target" is undefined');
  t.throws(() => bubbleGumGet(null, []), new TypeError, 'should throws a exception because the "target" is null');
});
