/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const tools = require('./src/client/vendor/tools');
const config = require('./config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSCSS = new ExtractTextPlugin({
  filename: 'css/[name].css',
  // disable: config.env === 'dev'
});

const entry = injectTools({
  main: './src/client/react/main/index.js',
  styles: './src/client/styles/styles.scss'
}, tools);

module.exports = {
  entry,
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].bundle.js',
  },

  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test:/\.(s*)css$/,
        use: extractSCSS.extract({
          fallback:'style-loader',
          use:['css-loader','sass-loader'],
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
      title: config.app.name,
      favicon: './src/client/img/site/favicon.png',
      filename: 'index.html',
      hash: true,
      inject: 'body',
    }),
    extractSCSS,
    new ExtraneousFileCleanupPlugin({
      extensions: ['.js'],
      minBytes: 3000,
    })
  ]
}

function injectTools(items, tools) {
  Object.keys(tools).forEach((name) => {
    if (config.tools[name]) {
      items[name] = tools[name];
    }
  });

  return items
}
