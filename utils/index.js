const constants = require('./const');

const debug = require('debug');
const fs = require('fs');

function makeDebug(namespace) {
  debug.enable(namespace);
  return debug(namespace);
}

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || ({}).toString.call(value) != '[object Object]' ) {
      return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
      return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
}

function padZero(value) {
  const str = "" + value;
  if (str.length > 1) {
    return str;
  }
  return '0' + str;
}

function getCurrentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = date.getDate();
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 判断文件/文件夹是否存在
function fsExistsSync(path) {
  try{
      fs.accessSync(path,fs.F_OK);
  }catch(e){
      return false;
  }
  return true;
}

module.exports = {
  ...constants,
  debug: makeDebug,
  isPlainObject,
  getCurrentTime,
  fsExistsSync
};