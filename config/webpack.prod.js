const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const pkg = require(path.resolve(__dirname, '../../../package.json'));

const dist = process.env.dist || './dist';

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, '../../../', dist),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        include: path.resolve(__dirname, "../../../"),
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: 'fast-sass-loader',
            options: {
              javascriptEnabled: true,
              data: `$table-prefix-cls: v${pkg.version.replace(/\./g, '-')}-better-table;`,
            }
          }
        ],
        include: path.resolve(__dirname, "../../../"),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: (url) => {
                return '.' + url.substring(url.indexOf('/'));
              },
              limit: 1000,
              // 通过特定的路径解析出每个ui组件的名字，所以这里的路径必须符合以下格式：'组件名/images/xx.xx'
              name: () => {
                return './images/[hash].[ext]';
              },
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
          },
          // Optional
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!use-context-selector|zzl-overlayscrollbars-react)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  externals: [
    {
      react: {
        root: "React",
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      "react-dom": {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      "antd": {
        root: 'antd',
        commonjs2: 'antd',
        commonjs: 'antd',
        amd: 'antd',
      },
      "dpl-react": {
        root: 'dplReact',
        commonjs2: 'dpl-react',
        commonjs: 'dpl-react',
        amd: 'dpl-react',
      },
      "tomato-ui/dist/h5/js/dpl": {
        commonjs2: 'tomato-ui/dist/h5/js/dpl',
        commonjs: 'tomato-ui/dist/h5/js/dpl',
      },
    },
    '@afe/rc-menu',
    /^(antd\/?.*)$/,
    /^(dpl-react\/?.*)$/,
    /^(@dpl\/?.*)$/
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "index.css",
      chunkFilename: "[id].css"
    }),
  ],
};
