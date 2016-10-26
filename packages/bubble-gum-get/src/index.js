import goto from 'bubble-gum-goto';

export default function get(path, target, defaultValue) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  return goto(path, function _get(value) {
    return (undefined === value) ? defaultValue : value;
  })(target);
};
