import goto from 'bubble-gum-goto';

const assign = Object.assign;

function isObject(value) {
  return Object(value) === value;
}

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

function buildIn(path, finalValue) {
  const _path = [].concat(path);
  const last = _path.pop();
  const init = build(last, finalValue);
  return _path.reduceRight((prev, keyPath) => build(keyPath, prev), init);
}

function getType(value) {
  if (isObject(value)) {
    return 'OBJECT';
  } else if (Array.isArray(value)) {
    return 'ARRAY';
  } else if (undefined === value) {
    return 'UNDEFINED';
  } else {
    return 'OTHERS';
  }
}

/**
 * checks if the value exists
 *
 * @param  {Object} target - object target
 * @param  {Array} path path to property
 * @param  {Boolean} isStrict
 * @return {Boolean}
 */
export default function set(target, path, valueToSet) {
  (undefined == target || undefined == path) && function(err) {
    throw err;
  }(new TypeError('shoulds be a valid value'));
  const _path = [].concat(path);
  const last = _path.pop();
  goto(_path, function _set({ current, key, indexPath, previous = target }) {
    switch (getType(current)) {
      case 'OBJECT':
      case 'ARRAY':
        current[last] = valueToSet
        return;
      case 'UNDEFINED':
        return assign(previous, buildIn(_path.slice(indexPath), build(last, valueToSet)));
      default:
        previous[key] = build(last, valueToSet)
        return;
    }
  })(target);
};
