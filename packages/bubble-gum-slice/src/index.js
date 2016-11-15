import set from 'bubble-gum-set';
import get from 'bubble-gum-get';

/**
 * Slice the object generating a new object
 *
 * @param {(Object|*[])} target - object target
 * @param {Object[]} config - Array with the configuration of the slice function
 * @param {*[]} config[].path - Array path to the property to be sliced
 * @param {*[]} config[].newPath - Array path to the property in the new object if it is undefined, it will have the same value as the config[].path
 * @return {Object} - Object with new values
 */
export default function slice(target, config) {
  return config.reduce((splitObject, { path, newPath }) => {
    const property = get(target, path);
    if (property === undefined) {
      return splitObject;
    }
    set(splitObject, (newPath || path), property);
    return splitObject;
  }, {});
};
