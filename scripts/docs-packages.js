const jsdoc2md = require('jsdoc-to-markdown');
const bubbleGumTools = require('../lib/bubble-gum-tools');

const generateModule = function generateModule(options) {
  const { id, longname, name, meta, } = options;
  const { filename, path, } = meta;
  return {
    id,
    longname,
    name,
    kind: 'module',
    meta: {
      lineno: 1,
      filename,
      path,
    },
    order: 0,
  };
}

const generateExportFn = function generateExportFn(options) {
  const {
    id, longname, kind, description, alias, params, examples, returns, meta
  } = options;
  return {
    id: `${id}--module.exports`,
    longname,
    name: 'module.exports',
    kind,
    isExported: true,
    description,
    memberof: alias,
    params,
    examples,
    returns,
    meta,
    order: 1,
  }
};

function getTemplateByFile(files) {
  return jsdoc2md.getTemplateDataSync({ files });
}
