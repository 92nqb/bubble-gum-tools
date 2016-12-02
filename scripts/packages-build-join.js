const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const minimist = require('minimist');
const path = require('path');
const {
  getfolderES6,
  getfolderTarget,
  getPackages: getPackagesConfig,
  getPackageRootPath,
  filterPackagesByAlias,
} = require('./utils');

const { _ : packagesAlias } = minimist(process.argv.slice(2));

const { PROJECT_PATH } = process.env;

const ES6_DIR = getfolderES6();
const OUTPUT_DIR = getfolderTarget();

function callRollup({entryPath, outputPath, name}) {
  console.log(`join packages ${entryPath} in ${outputPath}`);
  return rollup.rollup({
    entry: entryPath + '/index.js',
    plugins: [resolve()]
  }).then(bundle => bundle.write({
    format: 'es',
    moduleName: name,
    dest: outputPath + '/index.es2015.js'
  })).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

function getPackagePaths(moduleConfig) {
  const { moduleName: name, modulePath } = moduleConfig;
  return {
    entryPath: path.resolve(modulePath, ES6_DIR),
    outputPath: path.resolve(modulePath, OUTPUT_DIR),
    name,
  };
}

function getPackages(packagesList) {
  return packagesList
    .map(getPackageRootPath(PROJECT_PATH))
    .map(getPackagePaths);
}

function run() {
  const _packages = (packagesAlias.length === 0) ?
    getPackagesConfig() : filterPackagesByAlias(packagesAlias);

    getPackages(_packages).forEach(callRollup);
}

run();
