const tape = require('tape');
const bubbleGumWalk = require('../src');

tape('bubble-gum-walk - api', t => {
  t.plan(1);
  t.is(typeof bubbleGumWalk.walk, 'function', 'should be a function');
});

// a.a.a

// bubbleGumWalk.walk('doc.path.nose', (key, value, obj) => {}, {
//
// });

// {
//   doc: {
//     path:
//   }
// }

// 'path.nose.nose'


// console.log('bubble-gum-walk');
// console.log('====');
//
// tape('first test', t => {
//   t.plan(1);
//   t.pass();
// })
