const {resolve} = require("path");
module.exports = {
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../../src'),
    },
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /(?<!\.d)\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "../../../src"),
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
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            }
          }
        ]
      },
      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"],
        include: resolve(__dirname, "../../../")
      },
      {
        test: /\.less/,
        loaders: ["style-loader", "css-loader", {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }],
        include: resolve(__dirname, "../../../"),
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          {
            loader: 'css-loader',
          },
          "fast-sass-loader"
        ],
        include: [resolve(__dirname, "../../../src"), resolve(__dirname, "../../zzl-wix-storybook-utils")]
      }
    ]
  }
};
