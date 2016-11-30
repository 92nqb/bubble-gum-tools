const tape = require('tape');
const docsPackages = ('./docs-packages');

tape('test generate packages template with only one docs', t => {
  t.plan(1);
  const expected = jsdoc2md.getTemplateDataSync({
    files: __dirname + '/docs-packages.fixtures/one-jsdoc/ideal.js',
  });
  const actual = docsPackages.adaptJSDocTemplate(__dirname + '/docs-packages.fixtures/one-jsdoc/tofix.js');
  t.deepEquals(expected, actual, 'shoulds be equals');
  t.end();
});

tape('test generate packages template with many docs', t => {
  t.plan(1);
  const expected = jsdoc2md.getTemplateDataSync({
    files: __dirname + '/docs-packages.fixtures/many-jsdoc/ideal.js',
  });
  const actual = docsPackages.adaptJSDocTemplate(__dirname + '/docs-packages.fixtures/many-jsdoc/tofix.js');
  t.deepEquals(expected, actual, 'shoulds be equals');
  t.end();
});
