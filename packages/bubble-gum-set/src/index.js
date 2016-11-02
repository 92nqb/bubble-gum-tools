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
  (undefined == target || undefined == path) && function(err) {
      throw err;
  }(new TypeError('shoulds be a valid value'));
  const _path = [].concat(path);
  const last = _path.pop();
  return goto(_path, function _set(value, currentPath, indexPath, _target) {
    if (undefined === value) {
      const init = (Number.isSafeInteger(last) && last >= 0) ?
        (() => {
          const arr = [];
          arr[last] = valueToSet;
          return arr;
        })()
        : { [last]: valueToSet };

      const obj1 = _path.reduceRight((prev, keyPath) => {
        if (Number.isSafeInteger(keyPath) && keyPath >= 0) {
          const arr = [];
          arr[keyPath] = prev
          return arr;
        } else {
          return { [keyPath]: prev };
        }
      }, init);
      Object.assign(_target, obj1);
    } else {
      value[last] = valueToSet;
    }
  })(target);
};
