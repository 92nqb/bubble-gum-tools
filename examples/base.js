const bubbleGumTools = require('../lib/bubble-gum-tools');

const nestedObj = {
  root: [{
    foo: 'bar',
  }],
};

const foo = bubbleGumTools.get(nestedObj, ['root', 0, 'foo']);
console.log(foo);   //  => 'bar'

const existsFoo = bubbleGumTools.has(nestedObj, ['root', 0, 'foo']);
console.log(existsFoo); // => true

bubbleGumTools.set(nestedObj, ['root', 0, 'foo'], 'newBar');
console.log(nestedObj);   //  => {
                          //       root: [{
                          //         foo: 'newBar',
                          //       }],
                          //     }

const sObject = bubbleGumTools.slice(nestedObj, [{
  path: ['root', 0, 'foo'],
  newPath: ['newFoo'],
}]);
console.log(sObject);   // => {
                        //      newFoo: 'newBar'
                        //    }


const cObject = bubbleGumTools.create(['other-root', 0, 'other-foo'], 'other-bar');
console.log(cObject);   // => {
                        //     'other-root': [{
                        //       'other-foo': 'other-bar'
                        //     }]
                        //   }

const resultGOTO = bubbleGumTools.goto(['other-root', 0, 'other-foo'], ({ current, key }) => ({
  [key]: current,
}))(cObject);
console.log(resultGOTO);  //  =>  {
                          //        'other-foo': 'other-bar'
                          //      }
