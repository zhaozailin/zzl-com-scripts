const zlib = require('zlib');
const proxy = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { PROJ, isPlainObject, debug, fsExistsSync } = require('../utils');

const options = require("../utils/getOptions")();
const { appConfig } = require('../utils/getAppConfig');

const proxyDebugger = debug('proxy');

function loadRDConfig() {
  let rdrc = {};
  proxyDebugger('Loading proxy setting from .rdrc.js');

  try {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    rdrc = require(path.resolve(PROJ, '.rdrc.js'));

    proxyDebugger('Loading rd list success from .rdrc.js');
  } catch (e) {
    const rdliststr = fs.readFileSync(path.resolve(__dirname, './.rdrc.js'));
    fs.writeFileSync(path.resolve(PROJ, '.rdrc.js'), rdliststr);

    proxyDebugger('未在项目根目录检测到.rdrc.js, 正在为你生成, 请根据注释修改根目录下的 .rdrc.js 的对应后端的位置, 然后重新运行');
    process.exit(0);
  }

  try {
    require(path.resolve(PROJ, "mock", "mockTable.js"));
  } catch(e) {
    const isExist = fsExistsSync(path.resolve(PROJ, "mock"));
    // 如果不存在，则创建mock文件夹
    if(!isExist) {
      fs.mkdirSync(path.resolve(PROJ, "mock"));
    }
    const content = `module.exports = {

}`;
    fs.writeFileSync(path.resolve(PROJ, "mock", "mockTable.js"), content);
    proxyDebugger('未在项目根目录检测到mock/mockTable.js，正在为你生成');
  }
  return rdrc;
}


/*
 * 如果忽略掉某个路径
 */
function igonrePath(prefix) {
  return options.ignorePath && options.ignorePath.split(',').indexOf(prefix) !== -1;
}

/*
 * 如果 path 对应的是 string 配置那么直接用配置的ip
 * 如果 path 对应的是个后端字典 那么从字典中取
 */
function getRDIp(rdConfig, rdName) {
  if (typeof rdConfig === 'string') {
    return rdConfig;
  }
  if (!rdConfig[rdName]) {
    return rdConfig.defaultRd;
  }
  if (typeof rdConfig[rdName] === "string") {
    return rdConfig[rdName];
  }
  if (isPlainObject(rdConfig[rdName]) && rdConfig[rdName].url) {
    return rdConfig[rdName].url;
  }
}

// 获取pathRewrite
function getRDPathRewrite(rdConfig, pathRewrite, rdName) {
  if (typeof rdConfig === 'string' || !rdConfig[rdName]) {
    return pathRewrite;
  }
  if (isPlainObject(rdConfig[rdName]) && rdConfig[rdName].pathRewrite) {
    return rdConfig[rdName].pathRewrite;
  }
  return pathRewrite;
}

/*
 * 远程的代理
 */
const remoteProxyHandler = (rds, pathRewrite) => {
  const baseOpt = {
    target: getRDIp(rds, options.rd),
    changeOrigin: true,
  }
  pathRewrite = getRDPathRewrite(rds, pathRewrite, options.rd);
  const logOpt = {
    logLevel: 'debug',
    logProvider() {
      return {
        log: proxyDebugger,
        info: proxyDebugger,
        error: proxyDebugger,
        debug: proxyDebugger,
        warn: proxyDebugger,
      };
    },
    pathRewrite,
    onProxyReq(proxyReq, req) {
      req.on('data', (data) => {
        proxyDebugger(`${req.method} ${req.url} 参数为: => ${data.toString()}`);
      });
    },
    onProxyRes(proxyRes, req) {
      proxyRes.on('data', (data) => {
        zlib.unzip(data, (err, decoded) => {
          if (decoded) {
            proxyDebugger(`${req.method} ${req.url} 返回为: => ${decoded.toString()}`);
          }
        });
      });
    }
  }
  let proxyOpt = baseOpt;
  if (appConfig.enableProxyLog !== false) {
    proxyOpt = Object.assign(baseOpt, logOpt);
  }
  return proxy(proxyOpt);
}


// 远程的proxy
const proxyServer = (app) => {
  const rdrc = loadRDConfig();

  let mockPathRewrite = rdrc.mockPathRewrite || {};
  let rdrcPrefix = rdrc.prefix;

  /*
  * 处理本地的 mock
  */
  const localMockHandler = (prefix, isMock) => {
    if (!isMock) {
      if (typeof rdrcPrefix === "string") {
        rdrcPrefix = [rdrcPrefix];
      }
      prefix = rdrcPrefix.find((item) => { return prefix.indexOf(item) === 0 })
    }
    return null;
  } 

  if (options.rd) {
    proxyDebugger('正在连接到远程服务...');

    const remote = rdrc.remote;

    Object.keys(remote).forEach((prefix) => {
      const rds = remote[prefix];
      const flag = igonrePath(prefix);
      if (flag) {
        app.use(prefix, bodyParser.json());
        app.use(prefix, bodyParser.urlencoded({ extended: true }));
      }
      const proxyWrapper = !flag
        ? remoteProxyHandler(rds, rdrc.pathRewrite)
        : localMockHandler(prefix, false);
      app.use(prefix, proxyWrapper);
    });
  } else {
    proxyDebugger('正在连接本地mock...');

    if (typeof rdrcPrefix === "string" && !rdrcPrefix) {
      proxyDebugger('本地mock没有在 .rdrc.js 中配置 prefix 字段指定 那个前缀的请求 作为 mock 的入口');
      process.exit(1);
    }

    if (typeof rdrcPrefix !== "string" && !Array.isArray(rdrcPrefix)) {
      proxyDebugger('prefix 字段只能是字符串或者数组');
      process.exit(1);
    }

    if (Array.isArray(rdrcPrefix) && rdrcPrefix.length === 0) {
      proxyDebugger('prefix 字段数组内容必须有一个');
      process.exit(1);
    }

    if (typeof rdrcPrefix === "string") {
      rdrcPrefix = [rdrcPrefix];
    }

    rdrcPrefix.forEach((prefix) => {
      app.use(`${prefix}/*`, localMockHandler(prefix, true));
    });

    
  }
};

module.exports = proxyServer;
