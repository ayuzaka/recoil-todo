const path = require('path')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

/** @type {import('webpack').Configuration} */
const config = {
  entry: `${src}/index.tsx`,

  output: {
    path: `${dist}`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.wasm', '.json', '.jsx', '.css'],
  },
}

module.exports = config
