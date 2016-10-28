// const tape = require('tape');
// const bubbleGumSet = require('../src');
//
// tape('bubble-gum-get - api', t => {
//   t.plan(2);
//   t.is(typeof bubbleGumSet, 'function', 'should be a function');
//   t.is(bubbleGumSet.length, 3, 'should receive three params');
// })
//
// tape('set(path, value, target) - basic', t => {
//   t.plan(1);
//   const b = 'b';
//   const testObj = {
//     a: { b },
//   };
//   t.is(bubbleGumSet(['a', 'b'], testObj), b, 'should be the value in b path');
// });
// 
// tape('set(path, value, target) - advance', t => {
//   t.plan(4);
//   const c = 'c';
//   const b = { c };
//   const a = { b };
//   const testObj = { a };
//
//   t.same(bubbleGumSet([], testObj), testObj, 'should return the "testObj"');
//   t.same(bubbleGumSet(['a'], testObj), a, 'should be the value in "a" path');
//   t.same(bubbleGumSet(['a', 'b'], testObj), b, 'should be the value in "a, b" path');
//   t.is(bubbleGumSet(['a', 'b', 'c'], testObj), c, 'should be the value in "a, b, c" path');
// });
//
// tape('get(path, object) - should be return the undefined', t => {
//   t.plan(3);
//   const testObj = {
//     a: { b: undefined },
//   };
//   t.is(bubbleGumSet(['a', 'b'], testObj), undefined, 'should return "undefined"');
//   t.is(bubbleGumSet(['b'], testObj), undefined, 'should return "undefined"');
//   t.is(bubbleGumSet(['a', 'b', 'c'], testObj), undefined, 'should return "undefined"');
// });
//
// tape('get(path, object, defaultValue) - should be return the default value', t => {
//   t.plan(3);
//   const defaultVal = 'DEFAULT';
//   const testObj = {
//     a: { b: undefined },
//   };
//   t.is(bubbleGumSet(['a', 'b'], testObj, defaultVal), defaultVal, 'should return the default value');
//   t.is(bubbleGumSet(['b'], testObj, defaultVal), defaultVal, 'should return the default value');
//   t.is(bubbleGumSet(['a', 'b', 'c'], testObj, defaultVal), defaultVal, 'should return the default value');
// });
//
// tape('get(path, object, defaultValue) - throws a exception', t => {
//   t.plan(3);
//   t.throws(() => bubbleGumSet(null, ''), new TypeError, 'should throws a exception');
//   t.throws(() => bubbleGumSet([], undefined), new TypeError, 'should throws a exception');
//   t.throws(() => bubbleGumSet([], null), new TypeError, 'should throws a exception');
// });
