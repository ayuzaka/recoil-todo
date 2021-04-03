const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const src = path.resolve(__dirname, 'src')
const template = path.resolve(__dirname, 'template')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: `${template}/development.html`,
  filename: 'index.html',
  showErrors: true,
})

module.exports = merge(common, {
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
  },

  plugins: [htmlWebpackPlugin],
})
