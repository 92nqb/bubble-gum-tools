const babel = require('babel-core');
const minimist = require('minimist');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const {
  getPackages: getPackagesConfig,
  getfolderTarget,
  getPackageRootPath,
  filterPackagesByAlias
} = require('./utils');

const folderTarget = getfolderTarget();
const { PROJECT_PATH } = process.env.;
const { _ : packagesAlias } = minimist(process.argv.slice(2));

const ES2015_FILE = 'index.es2015.js';
const MAIN_FILE = 'index.js';
const BABEL_FILE = '.babelrc';

let defaultBabelRC;

function getBabelConfig(_path) {
  console.log(`get babel config file to ${_path}`);
  try {
    return fs.readJsonSync(_path);
  } catch (err) {
    console.log(chalk.red(`throw exception when read the '${_path}' file`));
    if (defaultBabelRC) {
      console.log(chalk.green('use default babel config'));
      return defaultBabelRC;
    }
    console.log(chalk.red('not default config'));
    process.exit(1);
  }
}

defaultBabelRC = getBabelConfig(path.resolve(PROJECT_PATH, BABEL_FILE));

function getPackagePaths(moduleConfig) {
  const { modulePath } = moduleConfig;
  return {
    babelConfig: path.resolve(modulePath, BABEL_FILE),
    targetES2015: path.resolve(modulePath, folderTarget, ES2015_FILE),
    targetPath: path.resolve(modulePath, folderTarget, MAIN_FILE),
  };
}

function getPackages(packagesList) {
  return packagesList.map(getPackageRootPath(PROJECT_PATH))
    .map(getPackagePaths);
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
    getPackagesConfig() : filterPackagesByAlias(packagesAlias);

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
