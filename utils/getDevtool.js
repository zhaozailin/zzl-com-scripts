const { appConfig } = require('./getAppConfig');
const devtool = appConfig.devtool;
const DEFAULT_VALUE = 'eval-source-map';

module.exports = function getDevtool() {
  return devtool ? devtool : DEFAULT_VALUE;
}
