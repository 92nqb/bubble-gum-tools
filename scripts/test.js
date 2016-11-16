require('babel-register');
require('babel-polyfill');

// npm run test <alias> - get set slice create has goto 

const glob = require('glob');
const minimist = require('minimist');
const { alias, rootDir } = require('../package.json').scriptsConfig;

const PACKAGES_FOLDER= process.env.PROJECT_PATH;
const { _ : packagesAlias } = minimist(process.argv.slice(2));

const getTestDirsByAlias = ({
  packages,
  path,
  alias,
}) => packages.map(aliasName => `${path}/${alias[aliasName]}/test/*.js`)
  .reduce((testDirs, globPattern) => testDirs.concat(glob.sync(globPattern)), []);

const getAllTestDirs = ({
  path,
  rootDir,
}) => glob.sync(`${path}/${rootDir}/*/test/*.js`);

function getTestDirs(packages) {
  const fn = [getAllTestDirs];
  return (fn[packages.length] || getTestDirsByAlias)({
    path: PACKAGES_FOLDER,
    packages,
    rootDir,
    alias,
  });
}

const testDirs = getTestDirs(packagesAlias);
testDirs.forEach(fileName => require(fileName));
