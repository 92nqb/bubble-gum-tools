const rollup = require('rollup');
const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const overwriteComments = require('./rollup/rollup-plugin-overwrite-comments');
const {
  getPackages,
  getRootDir,
  getModuleFather,
} = require('./utils');

const PROJECT_PATH = process.env.PROJECT_PATH;

const _packages = getPackages();
const rootDir = getRootDir();
const moduleFather = getModuleFather();

function addModuleFather(moduleConfig) {
  return Object.assign({}, moduleConfig, {
    moduleFather,
  });
}

function addModulePath(moduleConfig) {
  const { moduleName } = moduleConfig;
  const modulePath = path.resolve(PROJECT_PATH, rootDir, moduleName);
  console.log('add path: ' + modulePath);
  return Object.assign({}, moduleConfig, {
    path: modulePath,
  });
}

const modulesConfig = getPackages()
  .map(addModuleFather)
  .map(addModulePath);

rollup.rollup({
  entry: 'packages/index.js',
  plugins: [
    resolve(),
    overwriteComments({
      modulesConfig,
    })
  ]
}).then(bundle => bundle.write({
  format: 'es',
  moduleName: 'bubble-gum-tools',
  dest: 'lib/bubble-gum-tools.es2015.js'
})).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
