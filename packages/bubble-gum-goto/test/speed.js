const bubbleGumGoto = require('../lib');

function getTarget() {
  return {
    a: { b: { c: { d: { e: { f: { g: { h: { y: { j: { k: 'K' } } } } } } } } } }
  };
}

function getPath() {
  return ['a','b','c','d','e','f','g','h','y','j','k'];
}

console.time('all');
for (let i = 0; i < 5; i++) {
  console.time('init loop' + i);
  for (let i = 0; i < 10000; i++) {
    bubbleGumGoto(getPath(), () => {})(getTarget());
  }
  console.timeEnd('init loop' + i);
}
console.timeEnd('all');
