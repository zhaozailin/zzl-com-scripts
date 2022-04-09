const { resolve } = require('path');
const fs = require('fs');

const { PROJ } = require('./index');

const options = require("./getOptions")();
const appConfigFilePath = resolve(PROJ, options.config || 'app.config.js');

let appConfig = {
  entryList: [
    {
      name: "index",
      path: "index.js",
      templatePath: "index.html"  
    }
  ],
  enableSW: false,
  enableCompile: false,
  enableTs: false,
  report: false,
  proxy: true,
  forcePublicPath: false,
  getBabelConfig: (config) => {
    return config;
  }
};

if (fs.existsSync(appConfigFilePath)) {
  appConfig = Object.assign(appConfig, require(appConfigFilePath));
}

module.exports = {
  appConfig
}
