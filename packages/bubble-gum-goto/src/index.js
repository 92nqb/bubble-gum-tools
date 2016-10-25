

export default function goto(pathArr, fn) {
  const path = [].concat(pathArr).reverse();
  let pathLen = path.length;
  return function _goto(target) {
    let memoPrev = target;
    while(--pathLen >= 0) {
      const currentPath = path[pathLen];
      memoPrev = memoPrev[currentPath];
      if (memoPrev === undefined || pathLen === 0) {
        pathLen = -1;
        fn(memoPrev, currentPath, target);
      }
    }
  };
};
