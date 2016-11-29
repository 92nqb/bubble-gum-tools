# bubble-gum-tools

[![Coverage Status](https://coveralls.io/repos/github/nquicenob/bubble-gum-tools/badge.svg?branch=master)](https://coveralls.io/github/nquicenob/bubble-gum-tools?branch=master)
[![Build Status](https://travis-ci.org/nquicenob/bubble-gum-tools.svg?branch=master)](https://travis-ci.org/nquicenob/bubble-gum-tools)
[![license](https://img.shields.io/github/license/nquicenob/bubble-gum-tools.svg)](https://github.com/nquicenob/bubble-gum-tools/blob/master/LICENSE)
[![David](https://img.shields.io/david/nquicenob/bubble-gum-tools.svg)](https://david-dm.org/nquicenob/bubble-gum-tools)
[![npm](https://img.shields.io/npm/v/bubble-gum-tools.svg)](https://www.npmjs.com/package/bubble-gum-tools)

Work with nested objects is easy with a bubble-gum-tool.

# Install

You can install bubble-gum-tools using npm.

```
npm install --save bubble-gum-tools
```

Or you can also get a [modularized package per each method](https://www.npmjs.com/browse/keyword/bubble-gum-tools-modularized).

# API Reference

## Modules

<dl>
<dt><a href="#module_bubble-gum-tools">bubble-gum-tools</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#actionCallback">actionCallback</a> ⇒ <code>*</code></dt>
<dd><p>Callback at the end of the loop</p>
</dd>
</dl>

<a name="module_bubble-gum-tools"></a>

## bubble-gum-tools
**Example**  
```javascript
const bubbleGumTools = require('bubble-gum-tools');

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
console.log(cObject); // => { 'other-root': [{ 'other-foo': 'other-bar' }] }

// goto
const resultGOTO = bubbleGumTools.goto(['other-root', 0, 'other-foo'], ({ current, key }) => ({
  [key]: current,
}))(cObject);
console.log(resultGOTO); // => { 'other-foo': 'other-bar' }

```

* [bubble-gum-tools](#module_bubble-gum-tools)
    * [.create(path, initValue)](#module_bubble-gum-tools.create) ⇒ <code>Object</code> &#124; <code>Array</code>
    * [.get(target, path, [defaultValue])](#module_bubble-gum-tools.get) ⇒ <code>\*</code>
    * [.goto(path, fn)](#module_bubble-gum-tools.goto) ⇒ <code>\*</code>
    * [.has(target, path, [isStrict])](#module_bubble-gum-tools.has) ⇒ <code>Boolean</code>
    * [.set(target, path, valueToSet)](#module_bubble-gum-tools.set)
    * [.slice(target, config)](#module_bubble-gum-tools.slice) ⇒ <code>Object</code>

<a name="module_bubble-gum-tools.create"></a>

### bubble-gum-tools.create(path, initValue) ⇒ <code>Object</code> &#124; <code>Array</code>
Creates a new object or a new array with an initial value in function of a array path

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  
**Returns**: <code>Object</code> &#124; <code>Array</code> - the new array or object  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> | array path with the structure of the new object |
| initValue | <code>\*</code> | value that will contain the last property in the path |

**Example**  
```js
 const create = require('bubble-gum-tools').create;

 // create nested arrays
 const nestedArray = create([0, 2, 0], 'bar');
 console.log(nestedArray); // => [ [ , , [ 'bar' ] ] ]

 // create nested objects
 const nestedObject = create(['root', 'foo', 'bar'], 'bar');
 console.log(nestedObject); // => { root: { foo: { bar: 'bar' } } }

 // no defined value
 const noDefaultVal = get(target, ['no', 'defined']);
 console.log(noDefaultVal); // => undefined

 // create both
 const mixed = create([0, 'nested', 'key'], 'value');
 console.log(mixed); // => [ { nested: { key: 'value' } } ]

```
<a name="module_bubble-gum-tools.get"></a>

### bubble-gum-tools.get(target, path, [defaultValue]) ⇒ <code>\*</code>
Get the value at the end of path

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | object target |
| path | <code>Array</code> | array path to property |
| [defaultValue] | <code>\*</code> | default value if the param received is undefined |

**Example**  
```javascript

 const get = require('bubble-gum-tools').get;

 const target = {
   root: {
     foo: 'bar',
   },
   arr: [[
     ['baz'],
   ]],
 };

 // Working with nested objects
 const bar = get(target, ['root', 'foo']);
 console.log(bar); // => 'bar'

 // Working with nested arrays
 const baz = get(target, ['arr', 0, 0, 0]);
 console.log(baz); // => 'baz'

 // Set a default
 const defaultVal = get(target, ['no', 'defined'], 'default');
 console.log(defaultVal); // => 'default'

```
<a name="module_bubble-gum-tools.goto"></a>

### bubble-gum-tools.goto(path, fn) ⇒ <code>\*</code>
Goto path and call the function (actionCallback)

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  
**Returns**: <code>\*</code> - result of call the callback fn  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> | array path to property in target |
| fn | <code>[actionCallback](#actionCallback)</code> | call function in the end of loop |

**Example**  
```javascript

const goto = require('bubble-gum-tools').goto;

const target = {
  root: {
    foo: 'bar',
  },
};

goto(['root', 'foo'], (result) => {
  const {
    indexPath,
    previous,
    target,
    current,
    key,
  } = result;
  console.log(indexPath);  // =>  1
  console.log(previous);  // => { foo: 'bar' }
  console.log(target);  // => { root: { foo: 'bar' }, arr: [ [ [Object] ] ] }
  console.log(current);  // => bar
  console.log(key);  // => foo
})(target);

const result = goto(['root', 'foo'], ({current, key}) => (current + '-' + key))(target);
console.log(result); // => bar-foo

```
<a name="module_bubble-gum-tools.has"></a>

### bubble-gum-tools.has(target, path, [isStrict]) ⇒ <code>Boolean</code>
Checks if the value exists

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  
**Returns**: <code>Boolean</code> - Returns if exists or not  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> |  | object target |
| path | <code>Array</code> |  | array path to property in target |
| [isStrict] | <code>Boolean</code> | <code>false</code> | The check is strict |

**Example**  
```javascript

 const has = require('bubble-gum-tools').has;

 const target1 = {
   root: {
     foo: 'bar',
   },
   arr: [[
     ['baz'],
   ]],
 };

 const existsBar = has(target1, ['root', 'foo']);
 console.log(existsBar); // => true

 const existsBaz = has(target1, ['arr', 0, 0, 0]);
 console.log(existsBaz); // => true

 const noExists = has(target1, ['no', 'defined']);
 console.log(noExists); // => false

```

**isStrict = false**

```javascript

 const has = require('bubble-gum-tools').has;

 const target = {
   root: {
     zero: 0,
     null: null,
     empty: '',
     false: false,
   },
 };

 const isNotStrict = false;
 const noStrictZero = has(target, ['root', 'zero'], isNotStrict);
 console.log(noStrictZero); // => false
 const noStrictNull = has(target, ['root', 'null'], isNotStrict);
 console.log(noStrictNull); // => false
 const noStrictEmpty = has(target, ['root', 'empty'], isNotStrict);
 console.log(noStrictEmpty); // => false
 const noStrictFalse = has(target, ['root', 'false'], isNotStrict);
 console.log(noStrictFalse); // => false

```

**isStrict = true**

```javascript


 const has = require('bubble-gum-tools').has;

 const target = {
   root: {
     zero: 0,
     null: null,
     empty: '',
     false: false,
   },
 };

 const isStrict = true;
 const strictZero = has(target, ['root', 'zero'], isStrict);
 console.log(strictZero); // => true
 const strictEmpty = has(target, ['root', 'empty'], isStrict);
 console.log(strictEmpty); // => true
 const strictNull = has(target, ['root', 'null'], isStrict);
 console.log(strictNull); // => false
 const strictFalse = has(target, ['root', 'false'], isStrict);
 console.log(strictFalse); // => false

```
<a name="module_bubble-gum-tools.set"></a>

### bubble-gum-tools.set(target, path, valueToSet)
Set a new value in the defined path, if it does not exist create it

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | object target |
| path | <code>Array</code> | array path to property in target |
| valueToSet | <code>\*</code> | value to set in target |

**Example**  
```javascript

const set = require('bubble-gum-tools').set;

const target = {
  root: {
    foo: 'bar',
  },
  arr: [[
    ['baz'],
  ]],
};

set(target, ['root', 'foo'], 'newbar');
console.log(target.root.foo); // => 'newbar'

set(target, ['arr', 0, 0, 0], 'newbaz');
console.log(target.arr[0][0][0]); // => 'newbaz'

set(target, ['root', 'foo2'], 'foo2');
console.log(target.root.foo2); // => 'foo2'

set(target, ['arr', 0, 0, 1], 'newbaz2');
console.log(target.arr[0][0][1]); // => 'newbaz2'

```
<a name="module_bubble-gum-tools.slice"></a>

### bubble-gum-tools.slice(target, config) ⇒ <code>Object</code>
Slice the object generating a new object

**Kind**: static method of <code>[bubble-gum-tools](#module_bubble-gum-tools)</code>  
**Returns**: <code>Object</code> - splitObject - Object with new values  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | object target |
| config | <code>Array.Object</code> | Array with the configuration of the slice function |
| config[].path | <code>Array</code> | Array path to the property to be sliced |
| config[].newPath | <code>Array</code> | Array path to the property in the new object if it is undefined, it will have the same value as the config[].path |

**Example**  
```javascript

const slice = require('bubble-gum-tools').slice;

const target = {
  root: { foo: 'bar' },
  arr: [[['baz']]],
};

const sliced1 = slice(target, [{
  path: ['root', 'foo']
}]);
console.log(sliced1); // => { root: { foo: 'bar' } }

const sliced2 = slice(target, [{
  path: ['root', 'foo'],
  newPath: ['bar'],
}]);
console.log(sliced2); // => { bar: 'bar' }

const sliced3 = slice(target, [{
  path: ['root', 'foo'],
  newPath: [0],
}]);
console.log(sliced3); // => { '0': 'bar' }

const sliced4 = slice(target, [{
  path: ['arr', 0, 0, 0],
  newPath: ['baz'],
}, {
  path: ['root', 'foo'],
  newPath: ['bar'],
}]);
console.log(sliced4); // => { baz: 'baz', bar: 'bar' }

```
<a name="actionCallback"></a>

## actionCallback ⇒ <code>\*</code>
Callback at the end of the loop

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | values in the end of loop |
| options.indexPath | <code>Number</code> | index in the array path |
| options.target | <code>Object</code> &#124; <code>Array</code> | target object |
| [options.current] | <code>\*</code> | current value in target object |
| [options.key] | <code>\*</code> | current value in the array path |
| [options.previous] | <code>\*</code> | previous value in target object |


# TODOS

* [ ] Add method to compare objects in depth
* [ ] Add method to clone objects in depth

# License

MIT @ Nicolas Quiceno
