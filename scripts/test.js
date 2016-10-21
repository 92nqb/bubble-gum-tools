const glob = require('glob');
const requireAll = require('require-all');
const minimist = require('minimist');

const { _ : packages } = minimist(process.argv.slice(2));
const PACKAGES_FOLDER= `${process.env.NODE_PATH}/packages`;

function getTestDirs(packages, path) {
  return (packages.length > 0) ?
    packages.map(_package => `${path}/${_package}/test`)
    : glob.sync(`${path}/**/test`);
}

getTestDirs(packages, PACKAGES_FOLDER).forEach(testDir => requireAll(testDir))
