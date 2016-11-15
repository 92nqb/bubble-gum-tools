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
    a: 'a',
    b: 'b',
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

tape('slice(target, config) - rename path with "newPath" property in config param', t => {
  t.plan(3);
  const testObj = {
    a: 'a',
    b: 'b',
    deep: {
      deep1: 1,
      deep2: 2,
    },
  };

  t.same(bubbleGumSlice(testObj, [{
    path: ['a'],
    newPath: ['newPath'],
  }]), { newPath: 'a' }, 'should create the new object whith the property in "newPath"');

  t.same(bubbleGumSlice(testObj, [{
    path: ['a'],
  },{
    path: ['deep', 'deep1'],
    newPath: ['newPath'],
  }]), {
    a: 'a',
    newPath: 1,
   }, 'should create the new object whith the property in "newPath"');

   t.same(bubbleGumSlice(testObj, [{
     path: ['a'],
     newPath: ['a', 'b', 'c'],
   }]), {
     a: { b: { c: 'a', }, },
   }, 'should create the new object whith the property in "newPath"');

   t.end();
});

tape('slice(target, config) - working with arrays / search', t => {
  t.plan(4);
  const testObj = [
    [['property0'], ['property1']],
    [{
      p2: 'property2',
      deep: ['property3'],
    }],
  ];

  t.same(bubbleGumSlice(testObj, [{
    path: [0, 1, 0],
    newPath: ['newPath'],
  }]), {
    newPath : 'property1'
  }, 'should create the new object whith the property in path "[0, 1, 0]"');

  t.same(bubbleGumSlice(testObj, [{
    path: [1, 0, 'p2'],
    newPath: ['newPath'],
  }]), {
    newPath: 'property2'
  }, 'should create the new object whith the property in path "[1, 0, p2]"');

  t.same(bubbleGumSlice(testObj, [{
    path: [1, 0, 'deep'],
    newPath: ['newPath'],
  }]), {
    newPath: ['property3'],
  }, 'should create the new object whith the property in path "[1, 0, deep]"');

  t.same(bubbleGumSlice(testObj, [{
    path: [1, 0, 'deep', 0],
    newPath: ['newPath'],
  }]), {
    newPath: 'property3'
  }, 'should create the new object whith the property in path "[1, 0, deep, 0]"');

  t.end();
});

tape('slice(target, config) - working with arrays / create', t => {
  t.plan(3);
  const testObj = {
    prop: 'prop',
  };

  t.same(bubbleGumSlice(testObj, [{
    path: ['prop'],
    newPath: [1],
  }]), [, 'prop'], 'should create the new array whith the new path "[0]"');

  t.same(bubbleGumSlice(testObj, [{
    path: ['prop'],
    newPath: [0, 1],
  }]), [[, 'prop']], 'should create the new array whith the new path "[0, 1]"');

  t.same(bubbleGumSlice(testObj, [{
    path: ['prop'],
    newPath: [0, 'prop', 0],
  }]), [{
    prop: ['prop'],
  }], 'should create the new array whith the new path "[0, prop, 0]"');

  t.end();
});

tape('slice(target, config) - special cases / empty path', t => {
  t.plan(1);

  t.same(bubbleGumSlice(['array'], [{
    path: [],
    newPath: [1],
  }]), [, ['array']], 'Should return the target object to full');

  t.end();
});

tape('slice(target, config) - special cases / nonexistent path', t => {
  t.plan(2);

  t.same(bubbleGumSlice({ a: 'a' }, [{
    path: ['b'],
  }]), {}, 'Should return the empty object');

  t.same(bubbleGumSlice({ a: 'a' }, [{
    path: ['b'],
    newPath: ['a'],
  }]), {}, 'Should return the empty object');

  t.end();
});

tape('slice(target, config) - throws a exception', t => {
  t.plan(1);

  t.throws(() => bubbleGumSlice(null, [{
    path: ['b'],
  }]), 'Should throw a TypeError because the target is invalid');

  t.end();
});
