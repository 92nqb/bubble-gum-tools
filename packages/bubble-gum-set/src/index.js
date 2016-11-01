import goto from 'bubble-gum-goto';

/**
 * checks if the value exists
 *
 * @param  {Object} target - object target
 * @param  {Array} path path to property
 * @param  {Boolean} isStrict
 * @return {Boolean}
 */
export default function set(target, path, valueToSet) {
  const _path = [].concat(path);
  const last = _path.pop();
  return goto(_path, function _set(value, currentPath, indexPath, _target) {
    if (undefined === value) {
      // console.log(value, currentPath, indexPath);
      // console.log('=============');
      // console.log(_path.slice(indexPath));
      // console.log(_path);
      console.log(_target);
      _target
      _path.slice(indexPath).reduce((buildObj, current) => ({
        [current]: buildObj,
      }), _target);
      console.log(_target);
      //  console.log(a);
      // _target[currentPath] = _path.slice(indexPath).reduceRight((buildObj, current) => ({
      //   [current]: buildObj,
      // }), valueToSet);

    } else {
      value[last] = valueToSet;
    }
  })(target);
};
