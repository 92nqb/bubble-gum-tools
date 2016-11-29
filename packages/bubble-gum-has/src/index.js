import goto from '../../bubble-gum-goto/src';

const _hasFnNoStrict = function hasNoStrict({ current }) {
  return (!!current);
};

const _hasFnStrict = function hasNoStrict({ current }) {
  return !(current === false || undefined == current);
};

/**
 * Checks if the value exists
 * @alias module:bubble-gum-tools.has
 * @example
 *
 *
 * ```javascript
 *
 *  const has = require('bubble-gum-tools').has;
 *
 *  const target1 = {
 *    root: {
 *      foo: 'bar',
 *    },
 *    arr: [[
 *      ['baz'],
 *    ]],
 *  };
 *
 *  const existsBar = has(target1, ['root', 'foo']);
 *  console.log(existsBar); // => true
 *
 *  const existsBaz = has(target1, ['arr', 0, 0, 0]);
 *  console.log(existsBaz); // => true
 *
 *  const noExists = has(target1, ['no', 'defined']);
 *  console.log(noExists); // => false
 *
 * ```
 *
 * **isStrict = false**
 *
 * ```javascript
 *
 *  const has = require('bubble-gum-tools').has;
 *
 *  const target = {
 *    root: {
 *      zero: 0,
 *      null: null,
 *      empty: '',
 *      false: false,
 *    },
 *  };
 *
 *  const isNotStrict = false;
 *  const noStrictZero = has(target, ['root', 'zero'], isNotStrict);
 *  console.log(noStrictZero); // => false
 *  const noStrictNull = has(target, ['root', 'null'], isNotStrict);
 *  console.log(noStrictNull); // => false
 *  const noStrictEmpty = has(target, ['root', 'empty'], isNotStrict);
 *  console.log(noStrictEmpty); // => false
 *  const noStrictFalse = has(target, ['root', 'false'], isNotStrict);
 *  console.log(noStrictFalse); // => false
 *
 * ```
 *
 * **isStrict = true**
 *
 * ```javascript
 *
 *
 *  const has = require('bubble-gum-tools').has;
 *
 *  const target = {
 *    root: {
 *      zero: 0,
 *      null: null,
 *      empty: '',
 *      false: false,
 *    },
 *  };
 *
 *  const isStrict = true;
 *  const strictZero = has(target, ['root', 'zero'], isStrict);
 *  console.log(strictZero); // => true
 *  const strictEmpty = has(target, ['root', 'empty'], isStrict);
 *  console.log(strictEmpty); // => true
 *  const strictNull = has(target, ['root', 'null'], isStrict);
 *  console.log(strictNull); // => false
 *  const strictFalse = has(target, ['root', 'false'], isStrict);
 *  console.log(strictFalse); // => false
 *
 * ```
 *
 * @param {Object|Array} target - object target
 * @param {Array} path - array path to property in target
 * @param {Boolean} [isStrict=false] - The check is strict
 * @return {Boolean}  Returns if exists or not
 */
export default function has(target, path, isStrict = false) {
  (undefined == target) && function(err) {
      throw err;
  }(new TypeError('target shoulds be a valid value'));
  const hasFn = isStrict ? _hasFnStrict : _hasFnNoStrict;
  return goto(path, hasFn)(target);
};
