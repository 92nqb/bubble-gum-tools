/**
 * Callback at the end of the loop
 *
 * @callback actionCallback
 * @param {Object} options - values in the end of loop
 * @param {Number} options.indexPath
 * @param {Object|Array} options.target
 * @param {*} [options.current]
 * @param {*} [options.key]
 * @param {*} [options.previous]
 * @return {*}
 */

/**
 * Goto path and call the function (actionCallback)
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
