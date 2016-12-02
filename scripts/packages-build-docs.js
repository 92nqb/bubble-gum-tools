const handlebars = require('handlebars');
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

const PROJECT_PATH = process.env.PROJECT_PATH;
const README = 'README.md';
const PACKAGES_README_TEMPLATE = 'packages.readme.hbs';

const {
  getPackages,
  getRootDir,
  getModuleFather,
  getfolderES6,
} = require('./utils');

const rootDir = getRootDir();
const moduleFather = getModuleFather();
const folderES6 = getfolderES6();

const hTemplate = getTemplate(`${PROJECT_PATH}/${rootDir}/${PACKAGES_README_TEMPLATE}`);

// {{moduleName}}
// {{description}}
// {moduleName}}
const cTemplate = handlebars.compile(hTemplate);

getPackages()
  .map(addModuleFather)
  .map(addModulePath)
  .map(addCodePaths)
  .map(addTemplateData)
  .map(addDescription)
  .map(processTemplate)
  .forEach(writeReadme)
;

function addModuleFather(moduleConfig) {
  return Object.assign({}, moduleConfig, {
    moduleFather,
  });
}

function getTemplate(path) {
  console.log('load template in ' + path);
  return fs.readFileSync(path, 'utf8');
}

function addModulePath(moduleConfig) {
  const { moduleName } = moduleConfig;
  const pathModule = path.resolve(PROJECT_PATH, rootDir ,moduleName);
  return Object.assign({}, moduleConfig, {
    pathModule,
  });
}

function addCodePaths(moduleConfig) {
  const { pathModule } = moduleConfig;
  return Object.assign({}, moduleConfig, {
    pathCode: `${pathModule}/${folderES6}/**/*.js`,
  });
}

function addTemplateData(moduleConfig) {
  const { pathCode } = moduleConfig;
  const JSDoctemplateData = jsdoc2md.getTemplateDataSync({ files: pathCode });
  return Object.assign({}, moduleConfig, {
    JSDoctemplateData
  });
}

function addDescription(moduleConfig) {
  const { pathModule } = moduleConfig;
  const modulePackagejson = path.resolve(pathModule, 'package.json');
  console.log('read package.json file and add description in ' + modulePackagejson);
  const { description } = require(modulePackagejson);
  return Object.assign({}, moduleConfig, {
    description
  });
}

function processTemplate(moduleConfig) {
  const { pathModule } = moduleConfig;
  const { JSDoctemplateData } = moduleConfig;
  const main = jsdoc2md.renderSync({ data: JSDoctemplateData });
  return {
    pathModule,
    markdown: cTemplate(Object.assign({}, moduleConfig, {
      main
    })),
  };
}

function writeReadme({ pathModule, markdown }) {
  const readmePath = path.resolve(pathModule, README);
  console.log('write package readme in ' + readmePath);
  fs.writeFileSync(readmePath, markdown);
}
