# bubble-gum-goto

> Goes to property in nested object and execute a callback

`bubble-gum-goto` is part of **bubble-gum-tools**, check this [here](https://github.com/nquicenob/bubble-gum-tools)

# Install

You can install bubble-gum-goto using npm.

```
npm install --save bubble-gum-goto
```

# API Reference

## Modules

<dl>
<dt><a href="#module_bubble-gum-goto">bubble-gum-goto</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#actionCallback">actionCallback</a> ⇒ <code>*</code></dt>
<dd><p>Callback at the end of the loop</p>
</dd>
</dl>

<a name="module_bubble-gum-goto"></a>

## bubble-gum-goto
<a name="exp_module_bubble-gum-goto--module.exports"></a>

### module.exports(path, fn) ⇒ <code>function</code> ⏏
It receives a input path and a callback(actionCallback), It returns the function **_goto**,
the *_goto* function receives a target object or target array,
when the *_goto* is called, this navigates the target object or target array using the input path,
when it reaches the end of the path, *_goto* executs the callback and returns the result

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> | Path to property |
| fn | <code>[actionCallback](#actionCallback)</code> | Callback with the action that will be called at the end of the path |

**Example**  
```javascript

const goto = require('bubble-gum-goto');

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
<a name="actionCallback"></a>

## actionCallback ⇒ <code>\*</code>
Callback at the end of the loop

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Values in the end of the path |
| options.indexPath | <code>Number</code> | Current index in the array path |
| options.target | <code>Object</code> &#124; <code>Array</code> | Target object or target array |
| [options.current] | <code>\*</code> | Current value in target object |
| [options.key] | <code>\*</code> | Current value in the path |
| [options.previous] | <code>\*</code> | Previous value in target object |



# License

MIT @ Nicolas Quiceno
