const tape = require('tape');
const bubbleGumSet = require('../src');

tape('bubble-gum-set - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumSet, 'function', 'should be a function');
  t.is(bubbleGumSet.length, 3, 'should receive three params: "target", "path", "valueToSet"');
})

tape('set(target, path, valueToSet)', t => {
  t.plan(4);
  const testObj = {
    a: { a: 'a' },
    arr: [{ a: 'a' }, { a: 'a' }]
  };
  const b = 'b';
  bubbleGumSet(testObj, ['a', 'a'], b);
  t.is(testObj.a.a, b, 'should save the value in [ "a", "a" ]');
  bubbleGumSet(testObj, ['a'], b);
  t.is(testObj.a, b, 'should save the "b" value in [ "a" ]');

  const obj = { jia: 'jia' };
  bubbleGumSet(testObj, ['arr', 0], obj);
  t.same(testObj.arr[0], obj, 'should save the "obj" value in ["arr", 0]');

  bubbleGumSet(testObj, ['arr', 1, 'a'], obj);
  t.same(testObj.arr[1].a, obj, 'should save the "obj" value in ["arr", 1, "a"]');
});

tape('set(target, path, valueToSet) - should be create the new property with the value', t => {
  t.plan(1);
  const testObj = {};
  const secondValue = 'abc';
  bubbleGumSet(testObj, ['a', 'b', 'c'], secondValue);
  t.is(testObj.a.b.c, secondValue, `should be "${secondValue}"`);
});

tape('set(target, path, valueToSet) - should be create the new property with the value in array', t => {
  t.plan(3);
  const testObj = [];
  const b = 'b'
  bubbleGumSet(testObj, [0, 2, 5], b);
  t.ok(Array.isArray(testObj[0]), 'should be an array');
  t.ok(Array.isArray(testObj[0][2]), 'should be an array');
  t.ok(Array.isArray(testObj[0][2][5]),`should be "${b}" in the [0, 0, 0] path`);
});

tape('set(target, path, valueToSet) - should be create the new property with the value in array', t => {
  t.plan(3);
  const testObj = {};
  const b = 'b'

  bubbleGumSet(testObj, ['b', 0, 'b'], b);
  t.ok(Array.isArray(testObj.b), 'should be an array');
  t.same(testObj, {
    b: [{ b: 'b' }],
  }, 'should create a nested objects and arrays');
});

tape('set(target, path, valueToSet) - should create the new property with the value in array', t => {
  t.plan(3);
  const testObj = {};
  const b = 'b'
  bubbleGumSet(testObj, ['b', -1, 'b'], b);
  t.same(testObj, {
    b: { [-1]: { b } },
  }, 'should create a nested objects');
  t.false(Array.isArray(testObj.b), 'should be not an array');
  t.ok(Array.isArray(testObj.b[-1]), 'should be an array');
  t.is(testObj.b[0].b, b, `should be "${b}" in the ['b', 0, 0] path`);
});


// exceptions
// {}, [], 'a' // void path
// no array in path
//


// tape('get(path, object, defaultvalueToSet) - should be return the default value', t => {
//   t.plan(3);
//   const defaultVal = 'DEFAULT';
//   const testObj = {
//     a: { b: undefined },
//   };
//   t.is(bubbleGumSet(['a', 'b'], testObj, defaultVal), defaultVal, 'should return the default value');
//   t.is(bubbleGumSet(['b'], testObj, defaultVal), defaultVal, 'should return the default value');
//   t.is(bubbleGumSet(['a', 'b', 'c'], testObj, defaultVal), defaultVal, 'should return the default value');
// });

// tape('get(path, object, defaultvalueToSet) - throws a exception', t => {
//   t.plan(3);
//   t.throws(() => bubbleGumSet(null, ''), new TypeError, 'should throws a exception');
//   t.throws(() => bubbleGumSet([], undefined), new TypeError, 'should throws a exception');
//   t.throws(() => bubbleGumSet([], null), new TypeError, 'should throws a exception');
// });
