const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const glob = require('glob');
const minimist = require('minimist');
const { alias } = require('../package.json').scriptsConfig;
const { _ : packagesAlias } = minimist(process.argv.slice(2));

const PROJECT_ROOT = process.env.PROJECT_PATH;
const ES6_DIR = 'src';
const OUTPUT_DIR = 'lib';

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

function run() {
  const _packages = (packagesAlias.length === 0) ?
    Object.keys(alias) : packagesAlias;
    _packages.map(aliasName => ({
      packagesPath: `${PROJECT_ROOT}/${alias[aliasName]}`,
      packagesName: aliasName,
    }))
    .map(({ packagesPath, packagesName: name }) => ({
      entryPath: `${packagesPath}/${ES6_DIR}`,
      outputPath: `${packagesPath}/${OUTPUT_DIR}`,
      name,
    }))
    .forEach(callRollup);
}

run();
