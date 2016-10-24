const tape = require('tape');
const bubbleGumWalk = require('../src');

tape('bubble-gum-goto - api', t => {
  t.plan(1);
  t.is(typeof bubbleGumWalk.goto, 'function', 'should be a function');
});

tape('bubble-gum-walk - api', t => {
  t.plan(1);
  t.is(typeof bubbleGumWalk.goto, 'function', 'should be a function');
});
