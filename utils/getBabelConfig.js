const { appConfig } = require('./getAppConfig');

module.exports = function(modules = false) {
  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        modules,
        useBuiltIns: 'usage',
        corejs: 2,
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
    appConfig.enableTs && require.resolve('@babel/preset-typescript'), 
    require.resolve('@babel/preset-react'),
  ].filter(Boolean);
  const plugins = [
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: false, 
        helpers: true, 
        regenerator: false, 
        useESModules: true, 
      },
    ],
  ];

  const oldBabelConfig = {
    presets,
    plugins,
    env: {
      development: {
        plugins: [
          require.resolve('react-hot-loader/babel')
        ]
      }
    }
  }

  const newBabelConfig = appConfig.getBabelConfig(Object.assign({}, oldBabelConfig));

  return newBabelConfig ? newBabelConfig : oldBabelConfig;
};
