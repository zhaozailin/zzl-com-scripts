const spawn = require('cross-spawn');

// stdio控制打印的位置，detached为false不增加新的进程
const result = spawn('rimraf ./dist && webpack --config node_modules/cui-com-scripts/config/webpack.prod.js && webpack --config node_modules/cui-com-scripts/config/webpack.dev.js && node node_modules/cui-com-scripts/utils/copyFile.js', {shell: true, detached: false, stdio: 'inherit' });

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
