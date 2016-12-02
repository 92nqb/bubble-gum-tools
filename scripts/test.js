require('babel-register');
require('babel-polyfill');

// npm run test <alias> - get set slice create has goto
const glob = require('glob');
const minimist = require('minimist');

const {
  getfolderTest,
  getRootDir,
  filterPackagesByAlias,
  getPackageRootPath,
} = require('./utils');

const { PROJECT_PATH } = process.env;
const { _ : packagesAlias } = minimist(process.argv.slice(2));

const getTestDirsByAlias = ({ packages, path }) => {
  return filterPackagesByAlias(packages)
    .map(getPackageRootPath(path))
    .map(({modulePath}) => `${modulePath}/${getfolderTest()}/*.js`)
    .reduce((testDirs, globPattern) => testDirs.concat(glob.sync(globPattern)), []);
    ;
}

// good
const getAllTestDirs = ({
  path,
  rootDir,
}) => glob.sync(`${path}/${rootDir}/*/${getfolderTest()}/*.js`);

function getTestDirs(packages) {
  const fn = [getAllTestDirs];
  return (fn[packages.length] || getTestDirsByAlias)({
    path: PROJECT_PATH,
    packages,
    rootDir: getRootDir(),
  });
}

const testDirs = getTestDirs(packagesAlias);
testDirs.forEach(fileName => require(fileName));
