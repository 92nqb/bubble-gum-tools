const tape = require('tape');
const bubbleGumGoto = require('../src');

tape('bubble-gum-goto - api', t => {
  t.plan(4);
  t.is(typeof bubbleGumGoto.goto, 'function', 'should be a function');
  t.is(bubbleGumGoto.goto.length, 2, 'should receive two param');
  t.is(typeof bubbleGumGoto.goto(), 'function', 'should return a function');
  t.is(bubbleGumGoto.goto().length, 1, 'should receive one param');
});

tape('goto(path, fn)', t => {
  t.plan(6);
  [{
    path: ['doc'],
    testObj: {
      doc: 'doc'
    }
  }, {
    path: ['doc', 'root'],
    testObj: {
      doc: { root: 'root' },
    },
  }, {
    path: ['doc', 'root', 'path'],
    testObj: {
      doc: { root: { path: 'path' } },
    },
  }]. forEach({ path, testObj } => {
    bubbleGumGoto(path, (value, keyPath, obj) => {
      t.is(value, keyPath, 'should be equals');
      t.same(obj, testObj, 'should be the same obj');
    });
  });
});

tape('goto(path, fn) - with arrays', t => {
  t.plan(4);
  const arr = [{
    pos: '0',
  }, {
    pos: '1',
  }];
  const testObj = { arr };

  bubbleGumGoto(['arr', '1', 'pos'], (value, keyPath, obj) => {
    t.is(value, '1', 'should receive the value in "arr.1.pos"');
    t.is(keyPath, 'pos', 'should be equals to "pos"');
  })(testObj);
  bubbleGumGoto(['0', 'pos'], (value, keyPath, obj) => {
    t.is(value, '0', 'should receive the value in "arr.1.pos"');
    t.is(keyPath, 'pos', 'should be equals to "pos"');
  })(arr);
  t.end();
});

tape('goto(path, fn) - goto in the undefined path', t => {
  t.plan(4);
  const testObj = { a: 'a' };
  bubbleGumGoto(['a', 'b', 'c'], (value, keyPath, obj) => {
    t.is(value, undefined, 'should receive undefined value');
    t.is(keyPath, 'b', 'should execute the cb in the second iteration');
  })(testObj);
  bubbleGumGoto(['c'], (value, keyPath, obj) => {
    t.is(value, undefined, 'should receive undefined value');
    t.is(keyPath, 'c', 'should execute the cb in the first iteration');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - throws a exception', t => {
  t.plan(2);
  t.throws(() => bubbleGumGoto(null, () => {})({}), 'should throws a exception');
  t.throws(() => bubbleGumGoto([], null)({}), 'should throws a exception');
});
