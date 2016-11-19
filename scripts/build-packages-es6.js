const babel = require('babel-core');
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');
const minimist = require('minimist');

const BABEL_CONFIG_FILE = '.babelrc';
const PROJECT_ROOT = process.env.PROJECT_PATH;

const log = console.log;

function getBabelConfig(path, failback) {
  try {
    return fs.readJsonSync(path);
  } catch (err) {
    log(chalk.red(`throw exception when read the '${path}' file`));
    typeof failback === 'function' && failback(err);
  }
}

const opResult = successMessage => function opResult(err) {
  if (!err) {
    return log(successMessage);
  }
  log(chalk.red(err.stack));
  process.exit(1);
};

const defaultBabelRC = getBabelConfig(`${PROJECT_ROOT}/${BABEL_CONFIG_FILE}`, opResult(chalk.green('load default babel config')));

const createES6File = (babelRC = defaultBabelRC, { src, lib }) => function createES6File(jsFile) {
  const { code } = babel.transformFileSync(jsFile, Object.assign({}, {
    babelrc: false,
  }, babelRC));
  log(`build file: ${chalk.green(jsFile)}`);
  const fileName = jsFile.split(src + '/').pop();
  fs.outputFile(`${lib}/${fileName}`, code, opResult(`tranform in es6 the file '${chalk.green(jsFile)}'`));
};

const walkPackages = ({ sourceFolder, libFolder, babelFile }) => function walkPackages(packagePath) {
  log(`build package: ${chalk.green(packagePath)}`);
  const sourcePath = `${packagePath}/${sourceFolder}`;
  const babelRC = getBabelConfig(`${packagePath}/${babelFile}`);
  glob.sync(`${sourcePath}/**/**/*.js`).forEach(createES6File(babelRC, {
    src: sourcePath,
    lib: `${packagePath}/${libFolder}`,
  }));
};

(function run(options) {
  const {
    PACKAGES_FOLDER,
    SOURCE_FOLDER: libFolder,
    LIB_FOLDER: libFolder,
    BABEL_CONFIG_FILE: babelFile,
  } = options;
  glob.sync(`${PROJECT_ROOT}/${PACKAGES_FOLDER}/*`).forEach(walkPackages({
    sourceFolder,
    libFolder,
    babelFile,
  }));
})({
  PACKAGES_FOLDER: 'packages',
  SOURCE_FOLDER: 'src',
  LIB_FOLDER: 'lib',
  BABEL_CONFIG_FILE,
  PROJECT_ROOT,
});


//
// const babel = require('babel-core');
// const glob = require('glob');
// const fs = require('fs-extra');
// const chalk = require('chalk');
// const minimist = require('minimist');
//
// const BABEL_CONFIG_FILE = '.babelrc';
// const PROJECT_ROOT = process.env.PROJECT_PATH;
//
// const log = console.log;
//
// function getBabelConfig(path, failback) {
//   try {
//     return fs.readJsonSync(path);
//   } catch (err) {
//     log(chalk.red(`throw exception when read the '${path}' file`));
//     typeof failback === 'function' && failback(err);
//   }
// }
//
// const opResult = successMessage => function opResult(err) {
//   if (!err) {
//     return log(successMessage);
//   }
//   log(chalk.red(err.stack));
//   process.exit(1);
// };
//
// const defaultBabelRC = getBabelConfig(`${PROJECT_ROOT}/${BABEL_CONFIG_FILE}`, opResult(chalk.green('load default babel config')));
//
// const createES6File = (babelRC = defaultBabelRC, { src, lib }) => function createES6File(jsFile) {
//   const { code } = babel.transformFileSync(jsFile, Object.assign({}, {
//     babelrc: false,
//   }, babelRC));
//   log(`build file: ${chalk.green(jsFile)}`);
//   const fileName = jsFile.split(src + '/').pop();
//   fs.outputFile(`${lib}/${fileName}`, code, opResult(`tranform in es6 the file '${chalk.green(jsFile)}'`));
// };
//
// const walkPackages = ({ sourceFolder, libFolder, babelFile }) => function walkPackages(packagePath) {
//   log(`build package: ${chalk.green(packagePath)}`);
//   const sourcePath = `${packagePath}/${sourceFolder}`;
//   const babelRC = getBabelConfig(`${packagePath}/${babelFile}`);
//   glob.sync(`${sourcePath}/**/**/*.js`).forEach(createES6File(babelRC, {
//     src: sourcePath,
//     lib: `${packagePath}/${libFolder}`,
//   }));
// };
//
// (function run(options) {
//   const {
//     PACKAGES_FOLDER,
//     SOURCE_FOLDER: libFolder,
//     LIB_FOLDER: libFolder,
//     BABEL_CONFIG_FILE: babelFile,
//   } = options;
//   glob.sync(`${PROJECT_ROOT}/${PACKAGES_FOLDER}/*`).forEach(walkPackages({
//     sourceFolder,
//     libFolder,
//     babelFile,
//   }));
// })({
//   PACKAGES_FOLDER: 'packages',
//   SOURCE_FOLDER: 'src',
//   LIB_FOLDER: 'lib',
//   BABEL_CONFIG_FILE,
//   PROJECT_ROOT,
// });
