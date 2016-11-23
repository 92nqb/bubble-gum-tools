
# TODOS

```js
// lerna bootstrap,
// build packages/*/lib - con rullup, delete import
// delete packages.json.dependencies;
// delete packages.json.devDependencies;
// -- packaes listo para publicar
//
// -- publicar el padre ????????????
//
//
//
// .npmgitignore de padre
// * packages/*
// * scripts
//
```

## LIST

* Añadir **coveralls**
* Bajar a **0** los errores de **js standard-style**
* Añadir **travis**
* Añadir jsdocs documentation

# maybe

* Crear Makefile para scripting
* añadir **rollup** para eliminar los includes de npm y asi construir mini librerias libres de dependencias
* añadir soporte para **semver**
* quitar lerna para tener micromodulos sin dependencias

## posibles Features

* Clonar objetos igual a un object assign pero en profundidad
* Comparar objetos en profundidad


Valorar si al machacar objetos con set en profundidad debo arrojar error, es decir,

```
{a: 'a'}
bubbleGumSet(['a', 'b'], 'd') => throws error
```

## scripts

```

"_bootstrap": "lerna bootstrap",
"_clean": "rimraf packages/*/lib",
"_prebuild": "npm run clean",
"_build": "cross-env PROJECT_PATH=`pwd` node scripts/build",
"_test:dev": "cross-env PROJECT_PATH=`pwd` babel-node scripts/test",
"_test": "tape -r babel-register packages/*/test/*.js"

```


```js
// package.json    "test:dev1": "cross-env PROJECT_PATH=`pwd` node scripts/test --watch=true",
// require('babel-register')({
//   cache: false,
// });
// require('babel-polyfill');
//
// const glob = require('glob');
// const minimist = require('minimist');
// const chokidar = require('chokidar');
// const { alias, rootDir } = require('../package.json').scriptsConfig;
//
// const PACKAGES_FOLDER= process.env.PROJECT_PATH;
// const {
//   _ : packagesAlias,
//   watch,
// } = minimist(process.argv.slice(2));
//
// const getTestDirsByAlias = ({
//   packages,
//   path,
//   alias,
// }) => packages.map(aliasName => `${path}/${alias[aliasName]}/test/*.js`)
//   .reduce((testDirs, globPattern) => testDirs.concat(glob.sync(globPattern)), []);
//
// const getAllTestDirs = ({
//   path,
//   rootDir,
// }) => glob.sync(`${path}/${rootDir}/*/test/*.js`);
//
// function getTestDirs(packages) {
//   const fn = [getAllTestDirs];
//   return (fn[packages.length] || getTestDirsByAlias)({
//     path: PACKAGES_FOLDER,
//     packages,
//     rootDir,
//     alias,
//   });
// }
//
// const testDirs = getTestDirs(packagesAlias);
// // testDirs.forEach(fileName => require(fileName));
// console.log(watch);
// if (watch) {
//   const watcher = chokidar.watch(`${PACKAGES_FOLDER}/${rootDir}`);
//   watcher.on('ready', function() {
//     watcher.on('all', function() {
//       console.log('jiaaa');
//       // console.log("Clearing /dist/ module cache from server")
//       // console.log(require.resolve('babel-register'));
//       // delete require.cache[require.resolve('babel-register')];
//       // require('babel-register');
//       testDirs.forEach(fileName => {
//         delete require.cache[fileName];
//         require(fileName);
//       });
//     });
//   });
// }
//
// testDirs.forEach(fileName => require(fileName));

// // {
// //   persistent: true,
// //
// //
// //   ignoreInitial: false,
// //   followSymlinks: true,
// //   cwd: '.',
// //
// //   usePolling: true,
// //   interval: 100,
// //   binaryInterval: 300,
// //   alwaysStat: false,
// //   depth: 99,
// //   awaitWriteFinish: {
// //     stabilityThreshold: 2000,
// //     pollInterval: 100
// //   },
// //
// //   ignorePermissionErrors: false,
// //   atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
// // }
// const testDirs = getTestDirs(packagesAlias);
//
//
// if (watch) {
//   const watcher = chokidar.watch(`${PACKAGES_FOLDER}/${rootDir}`);
//   chokidar.watch(`${PACKAGES_FOLDER}/${rootDir}/**/**`, {
//     ignored: 'lib',
//     followSymlinks: false,
//   }).on('change', () => {
//
//     console.log('===============');
//     console.log('===============');
//     console.log('===============');
//     console.log('===============');
//     testDirs.map(fileName => {
//       // console.log(fileName);
//       // console.log('==========');
//       // console.log(require.cache[fileName]);
//       // delete require.cache[require.resolve(fileName)];
//       // console.log('==========');
//       // console.log(require.cache[fileName]);
//       // console.log(fileName);
//       // console.log(require.resolve(fileName).id);
//       // require(fileName);
//       // console.log('===============');
//       const mod = require.cache[require.resolve(fileName)];
//       console.log('===============');
//       console.log(mod);
//       delete require.cache[mod.id];
//       console.log('===============');
//       console.log(require.cache[require.resolve(fileName)]);
//       console.log('===============');
//       return fileName;
//     }).forEach(fileName => require(fileName));
//     //  delete require.cache[require.resolve(_path)];
//     // .forEach(dirname => requireAll({
//     //   dirname,
//     //   filter: /\.js$/,
//     // }));
//
//
//   });
// }
//
// testDirs.forEach(fileName => require(fileName));
//
```
