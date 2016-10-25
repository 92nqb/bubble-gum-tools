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
    let memoPrev = target;
    let currentPath;
    let init = 0;
    while((undefined !== memoPrev) && (init < len)) {
      currentPath = path[init];
      memoPrev = memoPrev[currentPath];
      init++;
    }
    return fn(memoPrev, currentPath, target);
  };
};
