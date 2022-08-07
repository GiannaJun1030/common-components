const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const { resolve } = require('path');
const __root = resolve(__dirname, '../');

const commonCssLoader = ['vue-style-loader', 'css-loader', 'postcss-loader'];

require('dotenv').config({ path: resolve(__root, './env/.env.local') });

const cssRules = [
  {
    test: /\.css$/i,
    use: [...commonCssLoader],
  },
  {
    test: /\.(sass|scss)$/i,
    use: [
      ...commonCssLoader,
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: resolve(__root, './src/commons/styles/var.scss'),
        },
      },
    ],
  },
];

const config = {
  mode: 'development',
  module: {
    rules: [...cssRules],
  },
  devServer: {
    historyApiFallback: true,
    port: 'auto',
    compress: true,
    open: true,
    hot: true,
  },
};

module.exports = merge(commonConfig, config);
