const bubbleGumTools = require('../lib/bubble-gum-tools');

const nestedObj = {
  root: [{
    foo: 'bar',
  }],
};

// get
const foo = bubbleGumTools.get(nestedObj, ['root', 0, 'foo']);
console.log(foo);   //  => 'bar'

// has
const existsFoo = bubbleGumTools.has(nestedObj, ['root', 0, 'foo']);
console.log(existsFoo); // => true

// set
bubbleGumTools.set(nestedObj, ['root', 0, 'foo'], 'newBar');
console.log(nestedObj);   //  => { root: [{ foo: 'newBar' }] }

// slice
const sObject = bubbleGumTools.slice(nestedObj, [{
  path: ['root', 0, 'foo'],
  newPath: ['newFoo'],
}]);
console.log(sObject);   // => { newFoo: 'newBar' }


// create
const cObject = bubbleGumTools.create(['other-root', 0, 'other-foo'], 'other-bar');
console.log(cObject);  // => { 'other-root': [{ 'other-foo': 'other-bar' }] }

// goto
const resultGOTO = bubbleGumTools.goto(['other-root', 0, 'other-foo'], ({ current, key }) => ({
  [key]: current,
}))(cObject);
console.log(resultGOTO);  //  =>  { 'other-foo': 'other-bar' }
