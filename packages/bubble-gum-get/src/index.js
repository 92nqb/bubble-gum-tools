import goto from '../../bubble-gum-goto/src';

/**
 * get the value at the end of path
 *
 * @param {(Object|*[])} target - object target
 * @param {*[]} path - array path to property
 * @param {*=} defaultValue - default value if the param received is undefined
 * @return {*}
 */
export default function get(target, path, defaultValue) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  return goto(path, function _get({ current }) {
    return (undefined === current) ? defaultValue : current;
  })(target);
};
