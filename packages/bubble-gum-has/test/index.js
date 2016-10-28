const tape = require('tape');
const bubbleGumHas = require('../src');

tape('bubble-gum-has - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumHas, 'function', 'should be a function');
  t.is(bubbleGumHas.length, 2, 'should receive three params');
})

tape('has(path, object) - basic', t => {
  t.plan(1);
  const b = 'b';
  const testObj = {
    a: { b },
  };
  t.ok(bubbleGumHas(['a', 'b'], testObj), 'should be ok');
});

tape('has(path, object) - advance', t => {
  t.plan(4);
  const c = 'c';
  const b = { c };
  const a = { b };
  const testObj = { a };

  t.is(bubbleGumHas([], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a'], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a', 'b'], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a', 'b', 'c'], testObj), true, 'should be ok');
});

tape('has(path, object) - should be return false', t => {
  t.plan(3);
  const testObj = {
    a: { b: undefined },
  };
  t.is(bubbleGumHas(['a', 'b'], testObj), false, 'should return "false"');
  t.is(bubbleGumHas(['b'], testObj), false, 'should return "false"');
  t.is(bubbleGumHas(['a', 'b', 'c'], testObj), false, 'should return "false"');
});

tape('has(path, object) - false and null values no strict', t => {
  t.plan(5);
  const testObj = {
    a: false,
    b: null,
    c: '',
    d: 0,
    e: undefined,
  };
  t.is(bubbleGumHas(['a'], testObj), false, '"false" shoulds be "false"');
  t.is(bubbleGumHas(['b'], testObj), false, '"null" shoulds be "false"');
  t.is(bubbleGumHas(['e'], testObj), false, '"undefined" shoulds be "false"');
  t.is(bubbleGumHas(['c'], testObj), false, '"empty string" shoulds be "false"');
  t.is(bubbleGumHas(['d'], testObj), false, '"zero" shoulds be "false"');
});

tape('has(path, object, strict) - false and null is false, empty string and zero is true with strict option', t => {
  t.plan(5);
  const testObj = {
    a: false,
    b: null,
    c: '',
    d: 0,
    e: undefined,
  };
  const isStrict = true;
  t.is(bubbleGumHas(['a'], testObj, isStrict), false, '"false" shoulds be "false"');
  t.is(bubbleGumHas(['b'], testObj, isStrict), false, '"null" shoulds be "false"');
  t.is(bubbleGumHas(['e'], testObj, isStrict), false, '"undefined" shoulds be "false"');
  t.is(bubbleGumHas(['c'], testObj, isStrict), true, '"empty string" shoulds be "true"');
  t.is(bubbleGumHas(['d'], testObj, isStrict), true, '"zero" shoulds be "true"');
});

tape('has(path, object) - throws a exception', t => {
  t.plan(3);
  t.throws(() => bubbleGumHas(null, ''), new TypeError, 'should throws a exception because the "path" is not array');
  t.throws(() => bubbleGumHas([], undefined), new TypeError, 'should throws a exception because the "target" is undefined');
  t.throws(() => bubbleGumHas([], null), new TypeError, 'should throws a exception because the "target" is null');
});
