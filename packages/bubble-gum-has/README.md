# bubble-gum-has

> Checks if the property exists in a nested object or a nested array using an array path

`bubble-gum-has` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-has using npm.

```
npm install --save bubble-gum-has
```

# API Reference

<a name="module_bubble-gum-has"></a>

## bubble-gum-has
<a name="exp_module_bubble-gum-has--module.exports"></a>

### module.exports(target, path, [isStrict]) ⇒ <code>Boolean</code> ⏏
It checks if the property exists in a nested object or a nested array using an array path

**Kind**: Exported function  
**Returns**: <code>Boolean</code> - exists - Returns if the property exists  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>Object</code> &#124; <code>Array</code> |  | Target object or target array |
| path | <code>Array</code> |  | Path to property |
| [isStrict] | <code>Boolean</code> | <code>false</code> | is strict |

**Example**  
```javascript

 const has = require('bubble-gum-has');

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

 const has = require('bubble-gum-has');

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


 const has = require('bubble-gum-has');

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


# License

MIT @ Nicolas Quiceno
