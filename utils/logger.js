/* global require */
/* global module */
'use strict';

const COLOR = require('./color');

/*
 * 生成日志
 * @param text 日志文本
 * @param tips 描述提示
 */
const TRACE = (text) => {
  console.log(COLOR.white, text);
};

const DEBUG = (text) => {
  console.log(COLOR.magenta, text);
};

const INFO = (text) => {
  console.log(COLOR.cyan, text);
};

const WARN = (text) => {
  console.log(COLOR.yellow, text);
};

const ERROR = (text) => {
  console.log(COLOR.red, text);
};

const SUCCESS = (text) => {
  console.log(COLOR.green, text);
};

module.exports = {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SUCCESS,
};
