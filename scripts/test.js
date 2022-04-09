const spawn = require('cross-spawn');

// 获取options参数
const options = require("../utils/getOptions")();
const update = options.update;

// stdio控制打印的位置，detached为false不增加新的进程
let shellStr = 'jest --coverage -c node_modules/cui-com-scripts/config/jest.config.js';
if (update) {
  shellStr += ' -u'
}
const result = spawn(shellStr, {shell: true, detached: false, stdio: 'inherit' });

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
