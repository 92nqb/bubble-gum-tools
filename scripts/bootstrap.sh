#!/bin/bash

./node_modules/.bin/lerna bootstrap
node ./scripts/_build.js
