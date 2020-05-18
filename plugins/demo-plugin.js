module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 同步
    compiler.hooks.done.tap('DemoPlugin', (stats) => {
      console.log('编译完成' + stats);
    })

    // 异步
    compiler.hooks.emit.tapAsync('DemoPlugin', (compilation, cb) => {
      setTimeout(() => {
        console.log('文件发射出来，等一下');
        cb();
      }, 1000);
    })

    // promise
    compiler.hooks.emit.tapPromise('DemoPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('文件发射出来，等一下');
          resolve()
        }, 1000);
      })
    })
  }
}