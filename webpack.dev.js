const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypescript = require('react-refresh-typescript')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const src = path.resolve(__dirname, 'src')
const template = path.resolve(__dirname, 'template')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: `${template}/template.html`,
  filename: 'index.html',
  showErrors: true,
})

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: src,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                jsx: 'react-jsxdev',
              },
              getCustomTransformers: () => ({
                before: [ReactRefreshTypescript()]
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        include: src,
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'public'),
  },

  plugins: [htmlWebpackPlugin, new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
}

module.exports = merge(common, config)
