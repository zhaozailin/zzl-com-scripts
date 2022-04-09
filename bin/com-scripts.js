#!/usr/bin/env node

const program = require('commander');
const execCommand = require('../utils/execCommand');

// program
//   .version('0.0.1');

const commandListMap = {
  start: "本地服务",
  build: "构建服务",
  test: '单元测试',
  publish: '发布',
  scanner: 'sonar扫描',
  eslinter: 'eslint扫描',
  prepublish: '发布前操作',
  publish: '发布',
};

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

// Checks for available update and returns an instance
const notifier = updateNotifier({
  pkg,
  shouldNotifyInNpmScript: true
});

// Notify using the built-in convenience method
notifier.notify();

// option 列表
const optionsList = [
  'port',
  'report',
  'key',
  // sonar扫描的git分支
  'version',
  'name',
  'update',
  'message',
  'publish_plat',
  'np',
  'test',
];

Object.keys(commandListMap).forEach((commandName) => {
  program
    .command(commandName)
    .option('-p, --port [port]', '在某个端口开启服务')
    .option('--report', '生成 js bundle 的 分析文件')
    .option('-k, --key [key]', '指定sonar扫描的项目标识')
    .option('-n, --name [name]', '指定sonar扫描的项目名')
    .option('-v, --version [version]', '指定sonar扫描的项目分支')
    .option('-u, --update [update]', '更新单测快照')
    .option('-m, --message [message]', '指定发布标题')
    .option('-pp, --publish_plat [publish_plat]', '发布平台')
    .option('--np', '只同步文档不发布到npm')
    .option('-t, --test [test]', '发布测试版')
    .description(commandListMap[commandName])
    .action((cmd) => {
      process.env.options = JSON.stringify(optionsList.reduce((pre, cur) => {
        pre[cur] = cmd[cur];
        return pre;
      }, {}));
      execCommand(commandName);
    });
});

if (process.argv.slice(2).length === 0) {
  program.help();
} else {
  program.parse(process.argv);
}
