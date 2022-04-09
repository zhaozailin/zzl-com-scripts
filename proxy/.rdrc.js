/*
 * 这个是默认生成的后端列表
 * 都遵循以下配置
 * prefix 表示 以 prefix 开头的 请求 代理到 本地的 mock 下面
 * remote 表示 需要映射的后端服务 可以 配置多条 映射到不同 rd 的机器, 
 *        格式为:
 *            '请求的路径的前缀': 'rd 的地址',
 *            '请求的路径的前缀': {
 *                 'rd的名字': 'rd 的地址',
 *                 'defaultRd': '默认的 rd 地址',
 *            }
 * 
 * 所有路径配置都是 express 的路由规则, 可配置正则表达式
 * 
 * 
 * 如何配合命令行使用:
 * 1. npm run dev
 *    就会全部的把 prefix 的路径 代理到本地的 mock 中去
 * 
 * 2. npm run dev -- --rd
 *    会把 所有的请求都会 proxy 到 rd 的机器上去, 逻辑为 如果 remote 单条
 *    的字段配置的是 string, 那么就是将这个路径配置到这个string上. 如果 remote 是 对象, 那么
 *    就是找到对象下的 defaultRd 字段, proxy 到这个 ip 上去.
 * 
 * 3. npm run dev -- --rd [name]
 *    这个主要是针对 remote 路径对应是 对象 配置的, 这个会找到对象下 [name]
 *    字段对应的路径而忽略掉 defaultRd 的配置, 如果对应的对象没有 [name] 字段
 *    则会默认走 defaultRd 的配置
 *    example: npm run dev -- --rd test
 * 
 * 4. npm run dev -- --rd [name?] --ignore-path [path1,path2...] 
 *    在开启远程调用的时候可以忽略掉一些 path 的路径, 让这些 path 直接走本地 mock 的接口 这样的
 *    example: npm run dev -- --rd --ignore-path /web/user
 * 
 * 5. npm run dev -- --rd [name?] --path [path1, path2...]
 *     在开启远程调用的时候可以只指定一些 path 的路径, 让这些 path 直接走远程 其他的路径 走本地的mock
 *    example: npm run dev -- --rd [name?] --path /web/user
 */



module.exports = {
  prefix: '/api', // mock 代理到
  remote: {
    '/api/xx': 'http://xx.com'
  }
};
