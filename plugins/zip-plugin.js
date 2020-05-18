const JSZip = require('jszip');
const path = require('path');
const { RawSource } = require('webpack-sources');
const zip = new JSZip();

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, cb) => {
      const folder = zip.folder(this.options.filename);

      for(let filename in compilation.assets) {
        const source = compilation.assets[filename].source();

        // 文件写入
        folder.file(filename, source);

        // 文件生成，生成 buffer 
        zip.generateAsync({ type: 'nodebuffer' })
          .then((content) => {
            // 获取 output path
            const outputPath = path.join(compilation.options.output.path, this.options.filename + '.zip');

            // 将绝对路径转成相对路径
            const outputRelativePath = path.relative(
              compilation.options.output.path,
              outputPath
            );

            // 将文件输入到 outputpath 
            compilation.assets[outputRelativePath] = new RawSource(content);
            cb();
          })
      }
    });
  }
}