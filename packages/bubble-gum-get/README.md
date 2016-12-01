# bubble-gum-get

> Get a property from a nested object or a nested array using an array path

`bubble-gum-get` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-get using npm.

```
npm install --save bubble-gum-get
```

# API Reference

<a name="module_bubble-gum-get"></a>

## bubble-gum-get
<a name="exp_module_bubble-gum-get--module.exports"></a>

### module.exports(target, path, [defaultValue]) ⇒ <code>\*</code> ⏏
It gets a property from a nested object or a nested array using an array path

**Kind**: Exported function  
**Returns**: <code>\*</code> - propertyValue  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> | Target object or target array |
| path | <code>Array</code> | Path to property |
| [defaultValue] | <code>\*</code> | Value to be returned in case the property does not exist |

**Example**  
```javascript

 const get = require('bubble-gum-get');

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


# License

MIT @ Nicolas Quiceno
