import goto from '../../bubble-gum-goto/src';

/**
 * It gets a property from a nested object or a nested array using an array path
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
 * @param {Object|Array} target - Target object or target array
 * @param {Array} path - Path to property
 * @param {*} [defaultValue] - Value to be returned in case the property does not exist
 * @return {*} propertyValue
 */
export default function get(target, path, defaultValue) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  return goto(path, function _get({ current }) {
    return (undefined === current) ? defaultValue : current;
  })(target);
};
