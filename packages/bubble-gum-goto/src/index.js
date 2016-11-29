/**
 * Callback at the end of the loop
 *
 * @callback actionCallback
 * @param {Object} options - values in the end of loop
 * @param {Number} options.indexPath - index in the array path
 * @param {Object|Array} options.target - target object
 * @param {*} [options.current] - current value in target object
 * @param {*} [options.key] - current value in the array path
 * @param {*} [options.previous] - previous value in target object
 * @return {*}
 */

/**
 * Goto path and call the function (actionCallback)
 *
 * @alias module:bubble-gum-tools.goto
 * @example
 *
 * ```javascript
 *
 * const goto = require('bubble-gum-tools').goto;
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
 * @param {Array} path - array path to property in target
 * @param {actionCallback} fn - call function in the end of loop
 * @return {*} result of call the callback fn
 */
export default function goto(path, fn) {
  const { length: len } = path;

  /**
   * Callback that will receive the target to go
   *
   * @param {Object|Array} target
   */
  return function _goto(target) {
    let previousValue, currentPath, indexPath;
    let currentValue = target;
    let init = 0;
    while((undefined !== currentValue) && (init < len)) {
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
