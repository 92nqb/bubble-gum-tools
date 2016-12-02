const path = require('path');
const { scriptsConfig } = require('../package.json');

function renameProps({ alias: moduleAlias, name: moduleName }) {
  return { moduleAlias, moduleName };
}

function getPackageByAlias(aliasName) {
  const { packages } = scriptsConfig;
  return packages.find(({alias}) => (alias === aliasName));
}

function getRootDir() {
  const { rootDir } = scriptsConfig;
  return rootDir;
}

exports.renameProps = renameProps;

exports.getPackageByAlias = getPackageByAlias;

exports.getRootDir = getRootDir;

exports.getPackages = function getPackages() {
  const { packages } = scriptsConfig;
  return packages.map(renameProps);
};

exports.getModuleFather = function getModuleFather() {
  const { moduleFather } = scriptsConfig;
  return moduleFather;
};

exports.getfolderES6 = function getfolderES6() {
  const { folderES6 } = scriptsConfig;
  return folderES6;
};

exports.getfolderTarget = function getfolderTarget() {
  const { folderTarget } = scriptsConfig;
  return folderTarget;
};

exports.getfolderTest = function getfolderTest() {
  const { folderTest } = scriptsConfig;
  return folderTest;
};

exports.getPackageRootPath = (projectPath) => function getPackageRootPath(moduleConfig) {
  const { moduleName } = moduleConfig;
  const modulePath = path.resolve(getRootDir(), moduleName);
  return Object.assign({}, moduleConfig, { modulePath });
}

exports.filterPackagesByAlias = function filterPackagesByAlias(aliasArr) {
  return aliasArr.map(aliasName => getPackageByAlias(aliasName))
    .map(renameProps);
}
