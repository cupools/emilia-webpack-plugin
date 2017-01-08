export default class EmiliaPlugin {
  apply(compiler) {
    const options = this.options || {}

    compiler.plugin('normal-module-factory', function (nmf) {
      nmf.plugin('before-resolve', function (data, callback) {
        // try to get spite hash
        callback(null, data)
      })
    })

    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('normal-module-loader', function (loaderContext, module) {
        // loaderContext.spriteHash = 'sprite
      })

      compilation.plugin('optimize-modules', function (modules) {})
    })

    compiler.plugin('emit', (compilation, callback) => {
      callback()
    })
  }
}
