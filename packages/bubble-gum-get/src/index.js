import goto from 'bubble-gum-goto';

/**
 * get the value at the end of path
 * 
 * @param  {Array} path path to property
 * @param  {Object} target - object target
 * @param  {any} defaultValue - default value if the param received is undefined
 * @return {any}
 */
export default function get(path, target, defaultValue) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  return goto(path, function _get(value) {
    return (undefined === value) ? defaultValue : value;
  })(target);
};
