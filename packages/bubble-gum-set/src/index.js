import goto from '../../bubble-gum-goto/src';
import create from '../../bubble-gum-create/src';

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
 * @module bubble-gum-set
 */

/**
 * It sets a new value in a nested object or a nested array using an array path, if the path does not exist create this
 *
 * @alias module:bubble-gum-set
 * @example
 *
 * ```javascript
 *
 * const set = require('bubble-gum-set');
 *
 * const target = {
 *   root: {
 *     foo: 'bar',
 *   },
 *   arr: [[
 *     ['baz'],
 *   ]],
 * };
 *
 * set(target, ['root', 'foo'], 'newbar');
 * console.log(target.root.foo); // => 'newbar'
 *
 * set(target, ['arr', 0, 0, 0], 'newbaz');
 * console.log(target.arr[0][0][0]); // => 'newbaz'
 *
 * set(target, ['root', 'foo2'], 'foo2');
 * console.log(target.root.foo2); // => 'foo2'
 *
 * set(target, ['arr', 0, 0, 1], 'newbaz2');
 * console.log(target.arr[0][0][1]); // => 'newbaz2'
 *
 * ```
 *
 *
 * @param {Object|Array} target - Target object or target array
 * @param {Array} path - Path to property
 * @param {*} valueToSet - Value to set in target
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
        Object.assign(previous, create(path.slice(indexPath), valueToSet));
        break;
      default:
        previous[key] = create([last], valueToSet)
        break;
    }
  })(target);
};
