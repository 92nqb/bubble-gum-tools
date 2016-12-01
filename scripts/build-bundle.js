const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const overwriteComments = require('./rollup/rollup-plugin-overwrite-comments');
const { alias } = require('../package.json').scriptsConfig;

const PROJECT_PATH = process.env.PROJECT_PATH;
// TODO: add to scriptsConfig
const MODULES_CONFIG = [{
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'create',
  moduleName: 'bubble-gum-create',
}, {
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'get',
  moduleName: 'bubble-gum-get',
}, {
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'goto',
  moduleName: 'bubble-gum-goto',
}, {
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'has',
  moduleName: 'bubble-gum-has',
}, {
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'set',
  moduleName: 'bubble-gum-set',
}, {
  moduleFather: 'bubble-gum-tools',
  moduleAlias: 'slice',
  moduleName: 'bubble-gum-slice',
}].map(moduleConfig => {
  const { moduleAlias } = moduleConfig;
  const path = alias[moduleAlias];
  return Object.assign({}, moduleConfig, {
    path: `${PROJECT_PATH}/${path}`,
  });
});

rollup.rollup({
  entry: 'packages/index.js',
  plugins: [
    resolve(),
    overwriteComments({
      modulesConfig: MODULES_CONFIG,
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
