const path = require('path');
const { PROJ, fsExistsSync } = require('./index');
const { appConfig } = require('./getAppConfig');

const defaultDirMappings = {};

if (fsExistsSync(path.resolve(PROJ, "lib"))) {
  defaultDirMappings['/lib'] = "lib";
}

if (fsExistsSync(path.resolve(PROJ, "static"))) {
  defaultDirMappings['/static'] = "static";
}

const staticDirMappings = {
  ...defaultDirMappings,
  ...(appConfig.staticDirMappings || {})
};

module.exports = staticDirMappings;
