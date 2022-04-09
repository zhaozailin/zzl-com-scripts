/* global module */
'use strict';

const color = {
  'white'         : '\x1B[37m%s\x1B[39m',
  'magenta'       : '\x1B[35m%s\x1B[39m',
  'cyan'          : '\x1B[36m%s\x1B[39m',
  'yellow'        : '\x1B[33m%s\x1B[39m',
  'red'           : '\x1B[31m%s\x1B[39m',
  'green'         : '\x1B[32m%s\x1B[39m',
};

module.exports = {
  ...color
};
