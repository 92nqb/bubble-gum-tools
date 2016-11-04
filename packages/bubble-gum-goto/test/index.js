const tape = require('tape');
const bubbleGumGoto = require('../src');

tape('bubble-gum-goto - api', t => {
  t.plan(4);
  t.is(typeof bubbleGumGoto, 'function', 'should be a function');
  t.is(bubbleGumGoto.length, 2, 'should receive two param');
  t.is(typeof bubbleGumGoto([]), 'function', 'should return a function');
  t.is(bubbleGumGoto([]).length, 1, 'should receive one param');
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
  }].forEach(({ path, testObj }) => {
    bubbleGumGoto(path, ({ current: value, key: keyPath, target: obj }) => {
      t.is(value, keyPath, 'should be equals');
      t.same(obj, testObj, 'should be the same obj');
    })(testObj);
  });
  t.end();
});

tape('goto(path, fn) - with arrays', t => {
  t.plan(8);
  const one = { pos: '1' };
  const zero = { pos: '0' };
  const arr = [zero, one];
  const testObj = { arr };

  bubbleGumGoto(['arr', '1', 'pos'], (result) => {
    const {
      indexPath,
      previous,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, one.pos, 'should receive the value in "arr.1.pos"');
    t.is(keyPath, 'pos', 'should be equals to "pos"');
    t.same(previous, one, 'shoulds recive the previous value');
    t.is(indexPath, 2, 'shoulds recive the indexPath');
  })(testObj);
  bubbleGumGoto(['0', 'pos'], (result) => {
    const {
      indexPath,
      previous,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, zero.pos, 'should receive the value in "arr.1.pos"');
    t.is(keyPath, 'pos', 'should be equals to "pos"');
    t.same(previous, zero, 'shoulds recive the previous value');
    t.is(indexPath, 1, 'shoulds recive the indexPath');
  })(arr);
  t.end();
});

tape('goto(path, fn) - goto in the undefined path in plain object', t => {
  t.plan(5);
  bubbleGumGoto(['a'], (result) => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, undefined, 'should receive undefined value');
    t.is(keyPath, 'a', 'should execute the cb in the second iteration');
    t.is(indexPath, 0, 'shoulds recive the indexPath');
    t.is(previous, undefined, 'shoulds recive the previous value');
    t.same(target, {}, 'shoulds recive the target');
  })({});
  t.end();
});

tape('goto(path, fn) - goto in the undefined path in one level object', t => {
  t.plan(4);
  const testObj = { a: 'a' };
  bubbleGumGoto(['a', 'b', 'c'], (result) => {
    const {
      indexPath,
      previous,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, undefined, 'should receive undefined value');
    t.is(keyPath, 'b', 'should execute the cb in the second iteration');
    t.is(indexPath, 1, 'shoulds recive the indexPath');
    t.is(previous, 'a', 'shoulds recive the previous value');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - goto in the undefined path in nested object', t => {
  t.plan(4);
  const nested =  { nested: 'nested' };
  const testObj = {
    nested: { nested },
  };
  bubbleGumGoto(['nested', 'nested', 'c'], (result) => {
    const {
      indexPath,
      previous,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, undefined, 'should receive undefined value');
    t.is(keyPath, 'c', 'should execute the cb in the second iteration');
    t.is(indexPath, 2, 'shoulds recive the indexPath');
    t.same(previous, nested, 'shoulds recive the previous value');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - goto path and return fn result', t => {
  t.plan(2);
  const testObj = { a: 'a' };
  t.ok(bubbleGumGoto(['a'], () => true)(testObj), 'should return true');
  const testObj2 = { b: testObj };
  t.is(bubbleGumGoto(['b' ,'a'], () => 'b')(testObj), 'b', 'should return "b"');
  t.end();
});

tape('goto(path, fn) - special test cases 1', t => {
  t.plan(5);
  const testObj = { a: 'a' };
  bubbleGumGoto([], (result) => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.same(value, testObj, 'should receive testObj like value');
    t.is(keyPath, undefined, 'should be undefined');
    t.is(previous, undefined, 'should be undefined');
    t.is(indexPath, undefined, 'should be undefined');
    t.same(target, testObj, 'should receive testObj like target object');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - special test cases 2', t => {
  t.plan(5);
  const testObj = new Boolean();
  testObj.deep = { a: undefined };
  bubbleGumGoto(['deep'], (result) => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.same(value, testObj.deep, 'should be empty object with undefined value');
    t.is(keyPath, 'deep', 'should be "deep"');
    t.is(undefined, previous, 'should be undefined');
    t.is(indexPath, 0, 'should be in the first iteration');
    t.same(target, testObj, 'should receive testObj like target object');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - special test cases 3', t => {
  t.plan(5);
  const testObj = new Boolean();
  testObj.deep = { a: undefined };
  bubbleGumGoto(['deep', 'a'], result => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, undefined, 'should be undefined');
    t.is(keyPath, 'a', 'should be "deep"');
    t.is(indexPath, 1, 'should be in the first iteration');
    t.same(previous, testObj.deep, 'should be undefined');
    t.same(target, testObj, 'should receive testObj like target object');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - special test cases 4', t => {
  t.plan(5);
  const testObj = false;
  bubbleGumGoto(['deep'], result => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, undefined, 'should be undefined');
    t.is(keyPath, 'deep', 'should be "deep" keyPaht');
    t.is(indexPath, 0, 'should be 0');
    t.is(previous, undefined, 'should be undefined');
    t.is(target, testObj, 'should be false');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - special test cases 5', t => {
  t.plan(5);
  const testObj = false;
  bubbleGumGoto([], result => {
    const {
      indexPath,
      previous,
      target,
      current: value,
      key: keyPath,
    } = result;
    t.is(value, testObj, 'should be undefined');
    t.is(keyPath, undefined, 'should be "deep" keyPaht');
    t.is(indexPath, undefined, 'should be 0');
    t.is(previous, undefined, 'should be undefined');
    t.is(target, testObj, 'should be false');
  })(testObj);
  t.end();
});

tape('goto(path, fn) - throws a exception', t => {
  t.plan(2);
  t.throws(() => bubbleGumGoto(null, () => {})({}), 'should throws a exception');
  t.throws(() => bubbleGumGoto([], null)({}), 'should throws a exception');
});
