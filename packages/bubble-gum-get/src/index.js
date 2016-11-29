import goto from '../../bubble-gum-goto/src';

/**
 * Get the value at the end of path
 * 
 * @alias module:bubble-gum-tools.get
 * @example
 *
 * ```javascript
 *
 *  const get = require('bubble-gum-tools').get;
 *
 *  const target = {
 *    root: {
 *      foo: 'bar',
 *    },
 *    arr: [[
 *      ['baz'],
 *    ]],
 *  };
 *
 *  // Working with nested objects
 *  const bar = get(target, ['root', 'foo']);
 *  console.log(bar); // => 'bar'
 *
 *  // Working with nested arrays
 *  const baz = get(target, ['arr', 0, 0, 0]);
 *  console.log(baz); // => 'baz'
 *
 *  // Set a default
 *  const defaultVal = get(target, ['no', 'defined'], 'default');
 *  console.log(defaultVal); // => 'default'
 *
 * ```
 *
 * @param {Object|Array} target - object target
 * @param {Array} path - array path to property
 * @param {*} [defaultValue] - default value if the param received is undefined
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
