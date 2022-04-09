const { appConfig } = require('./getAppConfig');

// 去掉左右两边的斜线
function trimSlash(path) {
  return path.replace(/^\//, "").replace(/\/$/, "");
}

const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = function getPublicPath(CDN, publicPath) {
  let newPublicPath = `${CDN || ''}/`;
  if (publicPath && publicPath !== "/") {
    let path = trimSlash(publicPath);
    if (path.indexOf('.') === 0 || path.startsWith("http")) {
      newPublicPath = `${path}/`;
    } else {
      newPublicPath += `${trimSlash(publicPath)}/`;
    }
  }
  return isEnvDevelopment && !appConfig.forcePublicPath ? '/' : newPublicPath;
}