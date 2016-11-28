const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');

rollup.rollup({
  entry: 'packages/index.js',
  plugins: [resolve()]
}).then(bundle => bundle.write({
  format: 'es',
  moduleName: 'bubble-gum-tools',
  dest: 'lib/bubble-gum-tools.es2015.js'
})).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
