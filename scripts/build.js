const babel = require('babel-core');
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');

const PACKAGES_FOLDER = 'packages';
const SOURCE_FOLDER = 'src';
const LIB_FOLDER = 'lib';
const NODE_PATH = process.env.NODE_PATH;
const log = console.log;

const packages = glob.sync(`${NODE_PATH}/${PACKAGES_FOLDER}/*`);

const createES6File = (packageFolder, babelRC) => function createES6File(jsFile) {
  const es6JsFile = babel.transformFileSync(jsFile, {
    plugins: babelRC.plugins || [],
    presets: babelRC.presets || [],
    babelrc: false,
  });
  log(`build file: ${chalk.green(jsFile)}`);
  const fileName = jsFile.split(`${packageFolder}/${SOURCE_FOLDER}/`).pop();
  fs.outputFile(`${packageFolder}/${LIB_FOLDER}/${fileName}`, es6JsFile.code, function functionName(err) {
    if (err) {
      log(chalk.red(err.stack));
      process.exit(1);
    }
  });
};

function getBabelConfig(path) {
  try {
    return fs.readJsonSync(path);
  } catch (err) {
    log(chalk.red(err.message));
  }
}

packages.forEach(packageFolder => {
  log(`build package: ${chalk.green(packageFolder)}`);
  const babelRC = getBabelConfig(`${packageFolder}/.babelrc`);
  if (babelRC) {
    const jsFiles = glob.sync(`${packageFolder}/${SOURCE_FOLDER}/**/**/*.js`);
    jsFiles.forEach(createES6File(packageFolder, babelRC));
  } else {
    fs.copy(`${packageFolder}/${SOURCE_FOLDER}`, `${packageFolder}/${LIB_FOLDER}`, function (err) {
      if (err) {
        log(chalk.red(err.stack));
        process.exit(1);
      }
    }); // copies file
  }
});


// console.log(Object.keys(babel));
// console.log(babel.options);
// console.log(`${packageFolder}/${SOURCE_FOLDER}/`);
// const fileName = jsFile.substr(jsFile.lastIndexOf() + 1);
// fsExtra()
// console.log(fileName);
// console.log(arr);
// console.log(packageFolder);
// console.log(jsFile);


//const str = fs.WriteStream(`${packageFolder}/${LIB_FOLDER}/index.js`);
// str.end(es6JsFile.code)
// console.log(babel.presets);
// console.log(es6JsFile);
// console.log(babel.presets);


// console.log(a);

//console.log(a);
// /console.log(babel);

// console.log(Object.keys(babel));
//
// console.log();

// const result = babel.transformFileSync('scripts/index.js');
// console.log(result);
