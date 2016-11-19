import goto from '../../bubble-gum-goto/src';
import create from '../../bubble-gum-create/src';

const assign = Object.assign;

function isObject(value) {
  return Object(value) === value;
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
 * Set a new value in the defined path, if it does not exist create it
 *
 * @param {(Object|*[])} target - object target
 * @param {*[]} path - array path to property in target
 * @param {*} valueToSet - value to set in target
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
        break;
      case 'UNDEFINED':
        assign(previous, create(path.slice(indexPath), valueToSet));
        break;
      default:
        previous[key] = create([last], valueToSet)
        break;
    }
  })(target);
};
