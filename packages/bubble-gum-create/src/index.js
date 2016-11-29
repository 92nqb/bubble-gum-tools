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
 * Creates a new object or a new array with an initial value in function of a array path
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
 * @param {Array} path - array path with the structure of the new object
 * @param {*} initValue - value that will contain the last property in the path
 * @return {Object|Array} the new array or object
 *
 */
export default function create(path, initValue) {
  (!Array.isArray(path)) && function(err) {
      throw err;
  }(new TypeError('path shoulds be a Array'));
  const _path = [].concat(path);
  const last = _path.pop();
  const init = getInitValue(path, initValue, last);
  return _path.reduceRight((prev, keyPath) => build(keyPath, prev), init);
};
