/**
 * Tools for work with nested objects
 *
 * @author Nicolas Quiceno <nquicenob@gmail.com>
 * @link https://github.com/nquicenob/bubble-gum-tools
 *
 */


import create from './bubble-gum-create/src';
import get from './bubble-gum-get/src';
import goto from './bubble-gum-goto/src';
import has from './bubble-gum-has/src';
import set from './bubble-gum-set/src';
import slice from './bubble-gum-slice/src';

/**
 * @module bubble-gum-tools
 *
 * @example
 *
 *
 * ```javascript
 * const bubbleGumTools = require('bubble-gum-tools');
 *
 * const nestedObj = {
 *   root: [{
 *     foo: 'bar',
 *   }],
 * };
 *
 * // get
 * const foo = bubbleGumTools.get(nestedObj, ['root', 0, 'foo']);
 * console.log(foo);   //  => 'bar'
 *
 * // has
 * const existsFoo = bubbleGumTools.has(nestedObj, ['root', 0, 'foo']);
 * console.log(existsFoo); // => true
 *
 * // set
 * bubbleGumTools.set(nestedObj, ['root', 0, 'foo'], 'newBar');
 * console.log(nestedObj);   //  => { root: [{ foo: 'newBar' }] }
 *
 * // slice
 * const sObject = bubbleGumTools.slice(nestedObj, [{
 *   path: ['root', 0, 'foo'],
 *   newPath: ['newFoo'],
 * }]);
 * console.log(sObject);   // => { newFoo: 'newBar' }
 *
 * // create
 * const cObject = bubbleGumTools.create(['other-root', 0, 'other-foo'], 'other-bar');
 * console.log(cObject); // => { 'other-root': [{ 'other-foo': 'other-bar' }] }
 *
 * // goto
 * const resultGOTO = bubbleGumTools.goto(['other-root', 0, 'other-foo'], ({ current, key }) => ({
 *   [key]: current,
 * }))(cObject);
 * console.log(resultGOTO); // => { 'other-foo': 'other-bar' }
 *
 * ```
 */
const bubblegumTools ={
  create: create,
  get: get,
  goto: goto,
  has: has,
  set: set,
  slice: slice,
};

export default bubblegumTools;
