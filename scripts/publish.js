const spawn = require('cross-spawn');
const comPkg = require('../../../package.json');

// 获取options参数
const options = require("../utils/getOptions")();
const logger = require("../utils/logger");
const message = options.message;
const nopublish = options.np;
const test = options.test;
const publish_plat = process.env.PLATFORM;

if (publish_plat === 'phoenix') {
  let shellStr;

  if (test) {
    shellStr = 'npm publish --tag next';
  }
  else {
    shellStr = `yarn run test && np ${comPkg.version} --any-branch --pubdoc --nogitcheck`;
    if (nopublish) {
      shellStr += ' --no-publish'
    }

    if (message) {
      shellStr += ' --message=' + message
    }
  }

  const result = spawn(shellStr, { shell: true, detached: false, stdio: 'inherit' });

  if (result.signal) {

    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
      );
    }
    process.exit(1);
  }
}
