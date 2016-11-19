const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const glob = require('glob');
const { alias } = require('../package.json').scriptsConfig;

const PROJECT_ROOT = process.env.PROJECT_PATH;
const ES6_DIR = 'src';
const OUTPUT_DIR = 'lib';

function callRollup({entryPath, outputPath, name}) {
  return rollup.rollup({
    entry: entryPath + '/index.js',
    plugins: [resolve()]
  }).then(bundle => bundle.write({
    format: 'cjs',
    moduleName: name,
    dest: outputPath + '/index.js'
  })).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

Object.keys(alias)
.map(aliasName => ({
  packagesPath: `${PROJECT_ROOT}/${alias[aliasName]}`,
  packagesName: aliasName,
}))
.map(({ packagesPath, packagesName: name }) => ({
  entryPath: `${packagesPath}/${ES6_DIR}`,
  outputPath: `${packagesPath}/${OUTPUT_DIR}`,
  name,
}))
.map(callRollup);
