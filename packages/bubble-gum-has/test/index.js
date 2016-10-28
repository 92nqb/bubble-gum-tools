const tape = require('tape');
const bubbleGumHas = require('../src');

tape('bubble-gum-has - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumHas, 'function', 'should be a function');
  t.is(bubbleGumHas.length, 2, 'should receive three params');
})

tape('has(target, path) - basic', t => {
  t.plan(1);
  const b = 'b';
  const testObj = {
    a: { b },
  };
  t.ok(bubbleGumHas(testObj, ['a', 'b']), 'should be ok');
});

tape('has(target, path) - advance', t => {
  t.plan(4);
  const c = 'c';
  const b = { c };
  const a = { b };
  const testObj = { a };

  t.is(bubbleGumHas(testObj, []), true, 'should be ok');
  t.is(bubbleGumHas(testObj, ['a']), true, 'should be ok');
  t.is(bubbleGumHas(testObj, ['a', 'b']), true, 'should be ok');
  t.is(bubbleGumHas(testObj, ['a', 'b', 'c']), true, 'should be ok');
});

tape('has(target, path) - should be return false', t => {
  t.plan(3);
  const testObj = {
    a: { b: undefined },
  };
  t.is(bubbleGumHas(testObj, ['a', 'b']), false, 'should return "false"');
  t.is(bubbleGumHas(testObj, ['b']), false, 'should return "false"');
  t.is(bubbleGumHas(testObj, ['a', 'b', 'c']), false, 'should return "false"');
});

tape('has(target, path) - false and null values no strict', t => {
  t.plan(5);
  const testObj = {
    a: false,
    b: null,
    c: '',
    d: 0,
    e: undefined,
  };
  t.is(bubbleGumHas(testObj, ['a']), false, '"false" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['b']), false, '"null" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['e']), false, '"undefined" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['c']), false, '"empty string" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['d']), false, '"zero" shoulds be "false"');
});

tape('has(target, path, strict) - false and null is false, empty string and zero is true with strict option', t => {
  t.plan(5);
  const testObj = {
    a: false,
    b: null,
    c: '',
    d: 0,
    e: undefined,
  };
  const isStrict = true;
  t.is(bubbleGumHas(testObj, ['a'], isStrict), false, '"false" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['b'], isStrict), false, '"null" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['e'], isStrict), false, '"undefined" shoulds be "false"');
  t.is(bubbleGumHas(testObj, ['c'], isStrict), true, '"empty string" shoulds be "true"');
  t.is(bubbleGumHas(testObj, ['d'], isStrict), true, '"zero" shoulds be "true"');
});

tape('has(target, path) - throws a exception', t => {
  t.plan(3);
  t.throws(() => bubbleGumHas('', null), new TypeError, 'should throws a exception because the "path" is not array');
  t.throws(() => bubbleGumHas(undefined, []), new TypeError, 'should throws a exception because the "target" is undefined');
  t.throws(() => bubbleGumHas(null, []), new TypeError, 'should throws a exception because the "target" is null');
});
