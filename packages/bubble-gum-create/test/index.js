const tape = require('tape');
const bubbleGumCreate = require('../src');

tape('bubble-gum-create - api', t => {
  t.plan(2);
  t.is(typeof bubbleGumCreate, 'function', 'should be a function');
  t.is(bubbleGumCreate.length, 2, 'should receive two params');
})

tape('create(path, initValue) - basic', t => {
  t.plan(1);
  t.same(bubbleGumCreate(['a', 'b', 'c'], 'c'), {
    a: { b: { c: 'c' } }
  }, 'shoulds return a new object with c property');
  t.end();
});

tape('create(path, initValue) - advanced', t => {
  t.plan(3);
  [{
    input: {
      path: ['a', 'a', 'a'],
      initValue: null,
    },
    expected: { a: { a: { a: null } } },
  }, {
    input: {
      path: ['a', 'b'],
      initValue: { c: 'c' },
    },
    expected: { a: { b: { c: 'c' } } },
  }, {
    input: {
      path: ['a', 'b'],
      initValue: [],
    },
    expected: { a: { b: [] } },
  }].forEach(({ input: { path, initValue } , expected }) => t.same(
    bubbleGumCreate(path, initValue), expected, 'shoulds return a new object with c property')
  );
  t.end();
});

tape('create(path, initValue) - working with numbers', t => {
  t.plan(3);
  [{
    input: {
      path: [0, 0, 0],
      initValue: false,
    },
    expected: [[[false]]],
  }, {
    input: {
      path: [0, 2, 0],
      initValue: true,
    },
    expected: [[ , , [true]]],
  }, {
    input: {
      path: [2, 0, 2, 'a'],
      initValue: {},
    },
    expected: [ , , [[ , , {a: {}}]]],
  }].forEach(({ input: { path, initValue } , expected }) => t.same(
    bubbleGumCreate(path, initValue), expected, 'shoulds return an array object with value in specific path')
  );
  t.end();
});

tape('create(path, initValue) - special cases 1 - various', t => {
  t.plan(4);
  t.same(bubbleGumCreate([], 'initValue'), {}, 'shoulds return empty object');
  t.same(bubbleGumCreate(['a', 'b'], undefined), { a: {} }, 'shoulds return object with "a" property');
  t.same(bubbleGumCreate([-1, 0], 0), { [-1]: [0] }, 'shoulds return object with "-1" property');
  t.same(bubbleGumCreate([undefined], 0), { [undefined]: 0 }, 'shoulds return object with "undefined" property');
});

tape('create(path, initValue) - special cases 2 - NaN', t => {
  t.plan(2);
  const objCreated = bubbleGumCreate([NaN], NaN);
  t.ok(isNaN((Object.keys(objCreated)[0])), 'the key shoulds be "NaN"');
  t.ok(Number.isNaN(objCreated[NaN]), 'the property in "NaN" key shoulds be "NaN"');
  t.end();
});

tape('create(path, initValue) - special cases 3 - functions', t => {
  t.plan(5);

  const { fn1 } = bubbleGumCreate(['fn1'], function fn1() {});
  t.is(typeof fn1, 'function', 'fn1 property shoulds be a function');

  const [ fn2 ] = bubbleGumCreate([0], function fn2() {});
  t.is(typeof fn2, 'function', 'fn2 property shoulds be a function');

  const { arrowfn } = bubbleGumCreate(['arrowfn'],  () => {});
  t.is(typeof arrowfn, 'function', 'arrowfn property shoulds be a function');

  const { anonymous } = bubbleGumCreate(['anonymous'],  function(){});
  t.is(typeof anonymous, 'function', 'anonymous property shoulds be a function');
  t.is(anonymous.name, '', 'anonymous property shoulds be a anonymous function');

  t.end();
});

tape('create(path, initValue) - throws a exception', t => {
  t.plan(5);
  [
    '',
    null,
    false,
    {},
    1
  ].forEach(data => {
    t.throws(() => bubbleGumCreate(data), new TypeError, 'should throws a exception because the "path" is not array');
  });
});
