const tape = require('tape');
const bubbleGumHas = require('../src');


/**
 * - integrar "strict" opcion por defecto , para que solo sea false con los valores undefined, false y null
 * - valor por defecto para strict, false
 * @type {[type]}
 */



tape('bubble-gum-has - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumHas, 'function', 'should be a function');
  t.is(bubbleGumHas.length, 2, 'should receive two params');
})

tape('has(path, object) - basic', t => {
  t.plan(1);
  const b = 'b';
  const testObj = {
    a: { b },
  };
  t.ok(bubbleGumHas(['a', 'b'], testObj), 'should be ok');
});

// zero value is true
//
tape('has(path, object) - advance', t => {
  t.plan(4);
  const c = 0;
  const b = { c };
  const a = { b };
  const testObj = { a };

  t.is(bubbleGumHas([], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a'], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a', 'b'], testObj), true, 'should be ok');
  t.is(bubbleGumHas(['a', 'b', 'c'], testObj), true, 'should be ok');
});

tape('has(path, object) - false and null values', t => {
  t.plan(3);
  const testObj = {
    a: false,
    b: null,
    c: '',
  };
  t.is(bubbleGumHas(['a'], testObj), false, 'should be "false"');
  t.is(bubbleGumHas(['b'], testObj), false, 'should be "false"');
  t.is(bubbleGumHas(['c'], testObj), false, 'should be "false"');
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

tape('has(path, object) - throws a exception', t => {
  t.plan(3);
  t.throws(() => bubbleGumHas(null, ''), new TypeError, 'should throws a exception');
  t.throws(() => bubbleGumHas([], undefined), new TypeError, 'should throws a exception');
  t.throws(() => bubbleGumHas([], null), new TypeError, 'should throws a exception');
});
