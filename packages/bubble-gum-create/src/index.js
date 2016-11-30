function build(index, value) {
  if (Number.isSafeInteger(index) && index >= 0) {
    const arr = [];
    arr[index] = value;
    return arr;
  }

  return {
    [index]: value
  };
}

function getInitValue(path, initValue, last) {
  return (path.length === 0 || initValue === undefined) ?
    {} : build(last, initValue);
}

/**
 * It creates a new object or an initialized array depending on the input path
 *
 * @alias module:bubble-gum-tools.create
 * @example
 *
 * ```js
 *  const create = require('bubble-gum-tools').create;
 *
 *  // create nested arrays
 *  const nestedArray = create([0, 2, 0], 'bar');
 *  console.log(nestedArray); // => [ [ , , [ 'bar' ] ] ]
 *
 *  // create nested objects
 *  const nestedObject = create(['root', 'foo', 'bar'], 'bar');
 *  console.log(nestedObject); // => { root: { foo: { bar: 'bar' } } }
 *
 *  // no defined value
 *  const noDefaultVal = get(target, ['no', 'defined']);
 *  console.log(noDefaultVal); // => undefined
 *
 *  // create both
 *  const mixed = create([0, 'nested', 'key'], 'value');
 *  console.log(mixed); // => [ { nested: { key: 'value' } } ]
 *
 * ```
 *
 * @param {Array} path - Input path with the structure
 * @param {*} initValue - Initial value for the end of the input path structure
 * @return {Object|Array} output - The new array or new object with the input path structure
 *
 */
export default function create(path, initValue) {
  (!Array.isArray(path)) && function(err) {
      throw err;
  }(new TypeError('path shoulds be an Array'));
  const _path = [].concat(path);
  const last = _path.pop();
  const init = getInitValue(path, initValue, last);
  return _path.reduceRight((prev, keyPath) => build(keyPath, prev), init);
};
