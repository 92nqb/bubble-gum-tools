const babel = require('babel-core');
const minimist = require('minimist');
const fs = require('fs-extra');
const chalk = require('chalk');

const PROJECT_PATH = process.env.PROJECT_PATH;
const { _ : packagesAlias } = minimist(process.argv.slice(2));
const { alias, rootDir } = require('../package.json').scriptsConfig;

const ES2015_FILE = 'index.es2015.js';
const MAIN_FILE = 'index.js';
const BABEL_FILE = '.babelrc';
const TARGET_FOLDER = 'lib';
let defaultBabelRC;

function getBabelConfig(path) {
  console.log(`get babel config file to ${path}`);
  try {
    return fs.readJsonSync(path);
  } catch (err) {
    console.log(chalk.red(`throw exception when read the '${path}' file`));
    if (defaultBabelRC) {
      console.log(chalk.green('use default babel config'));
      return defaultBabelRC;
    }
    console.log(chalk.red('not default config'));
    process.exit(1);
  }
}

defaultBabelRC = getBabelConfig(`${PROJECT_PATH}/${BABEL_FILE}`);

// PACKAGES_FOLDER
// alias
function getPackageRootPath(_package) {
  return `${PROJECT_PATH}/${_package}`;
}

function getPackagePaths(_package) {
  return {
    babelConfig: `${_package}/${BABEL_FILE}`,
    targetES2015: `${_package}/${TARGET_FOLDER}/${ES2015_FILE}`,
    targetPath: `${_package}/${TARGET_FOLDER}/${MAIN_FILE}`,
  };
}

// alias
function getPackages(packagesList) {
  return packagesList
    .map(name => alias[name])
    .map(getPackageRootPath)
    .map(getPackagePaths)
    ;
}

function toES6File(targetPath, babelRC) {
  console.log(`tranform to ES6 - ${targetPath}`);
  return babel.transformFileSync(targetPath, Object.assign({}, {
    babelrc: false,
  }, babelRC));
}

function writeFile({ targetPath, es5File: { code: es5code } }) {
  console.log(`write - ${targetPath}`);
  fs.outputFileSync(targetPath, es5code);
  return true;
}

function run() {
  const _packages = (packagesAlias.length === 0) ?
    Object.keys(alias) : packagesAlias;
  getPackages(_packages)
    .map(({babelConfig, targetES2015, targetPath}) => ({
      babelConfig: getBabelConfig(babelConfig),
      targetPath,
      targetES2015,
    }))
    .map(({babelConfig, targetES2015, targetPath}) => ({
      es5File: toES6File(targetES2015, babelConfig),
      targetPath,
    }))
    .forEach(writeFile)
    ;
}

run();
