module.exports = class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets;
      let content = `## 文件名   资源大小\r\n`;

      // [[bundle.js, {}], [index.js, {}]]
      Object.entries(assets).forEach(([filename, stateObj]) => {
        content += `- ${ filename }  ${stateObj.size()}`
      });
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        }
      }
    })
  }
}