const handlebars = require('handlebars');
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

const PROJECT_PATH = process.env.PROJECT_PATH;
const { alias, rootDir } = require('../package.json').scriptsConfig;

const templateFileName = 'packages.readme.hbs';
const README = 'README.md';
const mainFolder = 'src';

function getTemplate(path) {
  console.log('load template in ' + path);
  return fs.readFileSync(path, 'utf8');
}

const hTemplate = getTemplate(`${PROJECT_PATH}/${rootDir}/${templateFileName}`);

// {{moduleName}}
// {{description}}
// {moduleName}}
const cTemplate = handlebars.compile(hTemplate);
// TODO: add to scriptsConfig
const MODULES_CONFIG = [{
  description: 'aaaaaaaaaa',
  moduleAlias: 'create',
  moduleName: 'bubble-gum-create',
}, {
  description: 'aaaaaaaaaa',
  moduleAlias: 'get',
  moduleName: 'bubble-gum-get',
}, {
  description: 'aaaaaaaaaa',
  moduleAlias: 'goto',
  moduleName: 'bubble-gum-goto',
}, {
  description: 'aaaaaaaaaa',
  moduleAlias: 'has',
  moduleName: 'bubble-gum-has',
}, {
  description: 'aaaaaaaaaa',
  moduleAlias: 'set',
  moduleName: 'bubble-gum-set',
}, {
  description: 'aaaaaaaaaa',
  moduleAlias: 'slice',
  moduleName: 'bubble-gum-slice',
}].map(moduleConfig => {
  const { moduleAlias } = moduleConfig;
  const pathModule = alias[moduleAlias];
  return Object.assign({}, moduleConfig, {
    pathModule: `${PROJECT_PATH}/${pathModule}`,
  });
}).map(moduleConfig => {
  const { pathModule } = moduleConfig;
  return Object.assign({}, moduleConfig, {
    pathCode: `${pathModule}/${mainFolder}/**/*.js`,
  });
}).map(moduleConfig => {
  const { pathCode } = moduleConfig;
  const JSDoctemplateData = jsdoc2md.getTemplateDataSync({ files: pathCode });
  return Object.assign({}, moduleConfig, { JSDoctemplateData });
}).map(moduleConfig => {
  const { pathModule } = moduleConfig;
  const { JSDoctemplateData } = moduleConfig;
  const main = jsdoc2md.renderSync({ data: JSDoctemplateData });
  return {
    pathModule,
    markdown: cTemplate(Object.assign({}, moduleConfig, { main }))
  };
}).forEach(({ pathModule, markdown }) => {
  fs.writeFileSync(path.resolve(pathModule, README), markdown);
})
;
