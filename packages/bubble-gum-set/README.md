# bubble-gum-set

> Sets a new value in a nested object or a nested array using an array path, if the path does not exist create this

`bubble-gum-set` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-set using npm.

```
npm install --save bubble-gum-set
```

# API Reference

<a name="module_bubble-gum-set"></a>

## bubble-gum-set
<a name="exp_module_bubble-gum-set--module.exports"></a>

### module.exports(target, path, valueToSet) ⏏
It sets a new value in a nested object or a nested array using an array path, if the path does not exist create this

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | Target object or target array |
| path | <code>Array</code> | Path to property |
| valueToSet | <code>\*</code> | Value to set in target |

**Example**  
```javascript

const set = require('bubble-gum-set');

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


# License

MIT @ Nicolas Quiceno
