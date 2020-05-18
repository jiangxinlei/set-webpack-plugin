const path = require('path');
const DemoPlugin = require('./plugins/demo-plugin');
const ZipPlugin = require('./plugins/zip-plugin');
const FileListPlugin = require('./plugins/filelist-plugin');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  },
  mode: 'production',
  plugins: [
    new DemoPlugin({
      name: 'jxl'
    }),
    new ZipPlugin({
      filename: 'offline'
    }),
    new FileListPlugin({
      filename: 'list.md'
    })
  ]
}