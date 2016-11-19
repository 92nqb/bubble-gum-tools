const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');

rollup.rollup({
  entry: 'packages/index.js',
  plugins: [resolve()]
}).then(bundle => bundle.write({
  format: 'cjs',
  moduleName: 'bubble-gum',
  dest: 'lib/bubble-gum.js'
})).catch(err => {
  console.error(err);
  process.exit(1);
});
