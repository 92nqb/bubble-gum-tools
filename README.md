# bubble-gum-tools

[![Coverage Status](https://coveralls.io/repos/github/nquicenob/bubble-gum-tools/badge.svg?branch=master)](https://coveralls.io/github/nquicenob/bubble-gum-tools?branch=master)
[![Build Status](https://travis-ci.org/nquicenob/bubble-gum-tools.svg?branch=master)](https://travis-ci.org/nquicenob/bubble-gum-tools)
[![license](https://img.shields.io/github/license/nquicenob/bubble-gum-tools.svg)](https://github.com/nquicenob/bubble-gum-tools/blob/master/LICENSE)
[![David](https://img.shields.io/david/nquicenob/bubble-gum-tools.svg)](https://david-dm.org/nquicenob/bubble-gum-tools)
[![npm](https://img.shields.io/npm/v/bubble-gum-tools.svg)](https://www.npmjs.com/package/bubble-gum-tools)

Work with nested objects is easy with a bubble-gum-tool.

## Install

You can install bubble-gum-tools using npm.

```
npm install --save bubble-gum-tools
```

Or you can also get a [modularized package per each method](https://www.npmjs.com/browse/keyword/bubble-gum-tools-modularized).

## Usage

```js
const bubbleGumTools = require('bubble-gum-tools');

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

```

## API

* [bubbleGumTools.create](packages/bubble-gum-create/README.md/#api)
* [bubbleGumTools.get](packages/bubble-gum-get/README.md/#api)
* [bubbleGumTools.goto](packages/bubble-gum-goto/README.md/#api)
* [bubbleGumTools.has](packages/bubble-gum-has/README.md/#api)
* [bubbleGumTools.set](packages/bubble-gum-set/README.md/#api)
* [bubbleGumTools.slice](packages/bubble-gum-slice/README.md/#api)

## TODOS

* [ ] Add method to compare objects in depth
* [ ] Add method to clone objects in depth

## License

MIT @ Nicolas Quiceno
