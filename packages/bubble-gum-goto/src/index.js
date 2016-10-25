// # 1
export default function goto(pathArr, fn) {
  const path = [].concat(pathArr).reverse();
  let pathLen = path.length;
  return function _goto(target) {
    let memoPrev = target;
    let currentPath;
    while(--pathLen >= 0) {
      currentPath = path[pathLen];
      memoPrev = memoPrev[currentPath];
      if ((undefined === memoPrev) || (pathLen === 0)) {
        break;
      }
    }
    return fn(memoPrev, currentPath, target);
  };
};
