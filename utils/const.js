	
const { resolve } = require('path');
const options = require("./getOptions")();
const PROJ = resolve(process.cwd(), options.root || '.');
const SRC = resolve(PROJ, 'src');
const LIB = resolve(PROJ, 'lib');
const ES = resolve(PROJ, 'es');
const tsConfig = resolve(PROJ, 'tsconfig.json');
const pkg = require(resolve(PROJ, 'package.json'));

module.exports = {
  PROJ,
  SRC,
  LIB,
  ES,
  pkg,
  tsConfig
};