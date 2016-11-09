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
  t.plan(4);
  [{
    input: {
      path: ['a'],
      initValue: () => ({}),
    },
    expected: { a: () => ({}) },
  }, {
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
    expected: [
      [
        undefined,
        undefined,
        [true],
      ]
    ],
  }, {
    input: {
      path: [2, 0, 2, 'a'],
      initValue: {},
    },
    expected: [
      undefined,
      undefined,
      [[
        undefined,
        undefined,
        { a: {} }
      ]]
    ],
  }].forEach(({ input: { path, initValue } , expected }) => t.same(
    bubbleGumCreate(path, initValue), expected, 'shoulds return a new object with c property')
  );
  t.end();
});

tape('create(path, initValue) - special cases', t => {
  t.plan(4);
  t.same(bubbleGumCreate([], 'initValue'), {}, 'shoulds return empty object');
  t.same(bubbleGumCreate(['a', 'b'], undefined), { a: {} }, 'shoulds return object with "a" property');
  t.same(bubbleGumCreate([-1, 0], 0), { [-1]: [0] }, 'shoulds return object with "-1" property');
  t.same(bubbleGumCreate([undefined], 0), { [undefined]: 0 }, 'shoulds return object with "-1" property');
  t.same(bubbleGumCreate([NaN], NaN), { [NaN]: NaN }, 'shoulds return object with "-1" property');
});

tape('get(target, path, defaultValue) - throws a exception', t => {
  t.plan(3);
  t.throws(() => bubbleGumCreate('', null), new TypeError, 'should throws a exception');
  t.throws(() => bubbleGumCreate(undefined, []), new TypeError, 'should throws a exception because the "target" is undefined');
  t.throws(() => bubbleGumCreate(null, []), new TypeError, 'should throws a exception because the "target" is null');
});
