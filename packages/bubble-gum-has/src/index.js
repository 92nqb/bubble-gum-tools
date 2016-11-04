import goto from 'bubble-gum-goto';

const _hasFnNoStrict = function hasNoStrict({ current }) {
  return (!!current);
};

const _hasFnStrict = function hasNoStrict({ current }) {
  return !(current === false || undefined == current);
};

/**
 * checks if the value exists
 *
 * @param  {Object} target - object target
 * @param  {Array} path path to property
 * @param  {Boolean} isStrict
 * @return {Boolean}
 */
export default function has(target, path, isStrict = false) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  const hasFn = isStrict ? _hasFnStrict : _hasFnNoStrict;
  return goto(path, hasFn)(target);
};
