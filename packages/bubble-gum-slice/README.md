# bubble-gum-slice

> Slices a object or an array generating a new object or a new array

`bubble-gum-slice` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-slice using npm.

```
npm install --save bubble-gum-slice
```

# API Reference

<a name="module_bubble-gum-slice"></a>

## bubble-gum-slice
<a name="exp_module_bubble-gum-slice--module.exports"></a>

### module.exports(target, config) ⇒ <code>Object</code> ⏏
It slices a object or an array generating a new object or a new array

**Kind**: Exported function  
**Returns**: <code>Object</code> - slicedObject - New object or new array with sliced values  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | Target object or target array |
| config | <code>Array.Object</code> | Array with the configuration of the slice |
| config[].path | <code>Array</code> | Path to the property to be sliced |
| config[].newPath | <code>Array</code> | Path to sets a new value in the slicedObject, if this is not defined, this will have the same value as the config[].path |

**Example**  
```javascript

const slice = require('bubble-gum-slice');

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


# License

MIT @ Nicolas Quiceno
