import set from '../../bubble-gum-set/src';
import get from '../../bubble-gum-get/src';

/**
 * @module bubble-gum-slice
 */

/**
 * It slices a object or an array generating a new object or a new array
 *
 * @alias module:bubble-gum-slice
 * @example
 *
 * ```javascript
 *
 * const slice = require('bubble-gum-slice');
 *
 * const target = {
 *   root: { foo: 'bar' },
 *   arr: [[['baz']]],
 * };
 *
 * const sliced1 = slice(target, [{
 *   path: ['root', 'foo']
 * }]);
 * console.log(sliced1); // => { root: { foo: 'bar' } }
 *
 * const sliced2 = slice(target, [{
 *   path: ['root', 'foo'],
 *   newPath: ['bar'],
 * }]);
 * console.log(sliced2); // => { bar: 'bar' }
 *
 * const sliced3 = slice(target, [{
 *   path: ['root', 'foo'],
 *   newPath: [0],
 * }]);
 * console.log(sliced3); // => { '0': 'bar' }
 *
 * const sliced4 = slice(target, [{
 *   path: ['arr', 0, 0, 0],
 *   newPath: ['baz'],
 * }, {
 *   path: ['root', 'foo'],
 *   newPath: ['bar'],
 * }]);
 * console.log(sliced4); // => { baz: 'baz', bar: 'bar' }
 *
 * ```
 *
 * @param {Object|Array} target - Target object or target array
 * @param {Array.Object} config - Array with the configuration of the slice
 * @param {Array} config[].path - Path to the property to be sliced
 * @param {Array} config[].newPath - Path to sets a new value in the slicedObject, if this is not defined, this will have the same value as the config[].path
 * @return {Object} slicedObject - New object or new array with sliced values
 */
export default function slice(target, config) {
  return config.reduce((slicedObject, { path, newPath }) => {
    const property = get(target, path);
    if (property === undefined) {
      return slicedObject;
    }
    set(slicedObject, (newPath || path), property);
    return slicedObject;
  }, {});
};
