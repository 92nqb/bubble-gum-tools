/**
 * Callback at the end of the loop
 *
 * @callback actionCallback
 * @param {Object} options - Values in the end of the path
 * @param {Number} options.indexPath - Current index in the array path
 * @param {Object|Array} options.target - Target object or target array
 * @param {*} [options.current] - Current value in target object
 * @param {*} [options.key] - Current value in the path
 * @param {*} [options.previous] - Previous value in target object
 * @return {*}
 */

/**
 * @module bubble-gum-goto
 */

/**
 *
 * It receives a input path and a callback(actionCallback), It returns the function **_goto**,
 * the *_goto* function receives a target object or target array,
 * when the *_goto* is called, this navigates the target object or target array using the input path,
 * when it reaches the end of the path, *_goto* executs the callback and returns the result
 *
 * @alias module:bubble-gum-goto
 * @example
 *
 * ```javascript
 *
 * const goto = require('bubble-gum-goto');
 *
 * const target = {
 *   root: {
 *     foo: 'bar',
 *   },
 * };
 *
 * goto(['root', 'foo'], (result) => {
 *   const {
 *     indexPath,
 *     previous,
 *     target,
 *     current,
 *     key,
 *   } = result;
 *   console.log(indexPath);  // =>  1
 *   console.log(previous);  // => { foo: 'bar' }
 *   console.log(target);  // => { root: { foo: 'bar' }, arr: [ [ [Object] ] ] }
 *   console.log(current);  // => bar
 *   console.log(key);  // => foo
 * })(target);
 *
 * const result = goto(['root', 'foo'], ({current, key}) => (current + '-' + key))(target);
 * console.log(result); // => bar-foo
 *
 * ```
 *
 * @param {Array} path - Path to property
 * @param {actionCallback} fn - Callback with the action that will be called at the end of the path
 * @return {Function}
 */
export default function goto(path, fn) {
  const { length: len } = path;
  return function _goto(target) {
    let previousValue, currentPath, indexPath;
    let currentValue = target;
    let init = 0;
    while((undefined !== currentValue && null !== currentValue) && (init < len)) {
      if (init > 0) {
        previousValue = currentValue;
      }
      currentPath = path[init];
      currentValue = currentValue[currentPath];
      indexPath = init;
      init++;
    }
    return fn({
      current: currentValue,
      key: currentPath,
      indexPath,
      previous: previousValue,
      target,
    });
  };
};
