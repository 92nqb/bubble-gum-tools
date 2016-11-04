/**
 * goto path and call the function
 *
 * @param  {Array} path path to property
 * @param  {Function} fn call function in the end of loop
 * @return {*} result of call the callback fn
 */
export default function goto(path, fn) {
  const { length: len } = path;
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
