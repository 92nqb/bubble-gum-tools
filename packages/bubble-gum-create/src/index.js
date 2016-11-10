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
 * Creates a new object or array with an initial value in function of a path
 *
 * @param  {Array} path - path with the structure of the new object
 * @param  {any} initValue - value that will contain the last property in the path
 * @return {Object|Array} - value created
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
