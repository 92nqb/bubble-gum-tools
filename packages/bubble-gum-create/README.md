# bubble-gum-create

> Creates a new object or an initialized array depending on the input path

`bubble-gum-create` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-create using npm.

```
npm install --save bubble-gum-create
```

# API Reference

<a name="module_bubble-gum-create"></a>

## bubble-gum-create
<a name="exp_module_bubble-gum-create--module.exports"></a>

### module.exports(path, initValue) ⇒ <code>Object</code> &#124; <code>Array</code> ⏏
It creates a new object or an initialized array depending on the input path

**Kind**: Exported function  
**Returns**: <code>Object</code> &#124; <code>Array</code> - output - The new array or new object with the input path structure  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> | Input path with the structure |
| initValue | <code>\*</code> | Initial value for the end of the input path structure |

**Example**  
```js
 const create = require('bubble-gum-create');

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


# License

MIT @ Nicolas Quiceno
