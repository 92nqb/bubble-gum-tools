const acorn = require('acorn');

const DEFAULT_OPTIONS = {
  ecmaVersion: 6,
  sourceType: 'module',
};

function getModuleRegex({ moduleName }) {
  const tagModule = '@module';
  const moduleRegex = new RegExp(`${tagModule}\\s{1,5}${moduleName}`);
  return {
    regx: moduleRegex,
    value: '',
  };
}

function getAliasRegex({ moduleName, moduleAlias, moduleFather }) {
  const tagAlias = '@alias';
  const tagModule = 'module:';
  const aliasRegex = new RegExp(`${tagAlias}\\s{1,5}${tagModule}${moduleName}`);
  const newAlias = `${tagAlias} ${tagModule}${moduleFather}.${moduleAlias}`;
  return {
    regx: aliasRegex,
    value: newAlias,
  };
}

function getRequireRegex({ moduleAlias, moduleFather, moduleName }) {
  const tagRequire = 'require';
  const requireRegex = new RegExp(`${tagRequire}\\('${moduleName}'\\)`, 'g');
  const newRequire = `${tagRequire}('${moduleFather}').${moduleAlias}`;
  return {
    regx: requireRegex,
    value: newRequire,
  };
}

function getActions(moduleConfig) {
  return [
    getModuleRegex(moduleConfig),
    getAliasRegex(moduleConfig),
    getRequireRegex(moduleConfig),
  ];
}

function overWriteComments(comment, moduleConfig) {
  return getActions(moduleConfig).reduce(
    (_comment, {regx, value}) => _comment.replace(regx, value),
  comment);
}

function transform(code, file, options) {
  const { ecmaVersion, sourceType, moduleConfig } = options;
  try {
    acorn.parse(code, {
      onComment: transformComment,
      ecmaVersion: ecmaVersion,
      sourceType: sourceType,
    });
  } catch (err) {
    err.message += " in " + file;
    throw err;
  }

  function transformComment(block, text, start, end) {
    if (block) {
      const _block = overWriteComments(code.slice(start, end), moduleConfig);
      code = code.slice(0, start) + _block + code.slice(end);
    }
  }
  return { code, map: null };
}

function magicComments (options = {}) {
  const { ecmaVersion, sourceType } = Object.assign({}, DEFAULT_OPTIONS, options);
  const { modulesConfig } = options;
  return {
    name: 'overwrite-comments',
    transform: function transform$$(code, id) {
      const moduleConfig = modulesConfig.find(({path}) => id.startsWith(path));
      return moduleConfig ? transform(code, id, {
        ecmaVersion,
        sourceType,
        moduleConfig
      }) : null;
    },
  };
}

module.exports = magicComments;
