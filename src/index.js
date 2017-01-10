import path from 'path'

export default class EmiliaPlugin {
  apply(compiler) {
    const options = this.options || {}

    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('before-resolve', (data, callback) => {
        if (!data) {
          return callback()
        }

        return callback(null, {
          ...data,
          request: data.request.indexOf('.png') > -1 ? './extract.png' : data.request
        })
      })
    })

    compiler.plugin('compilation', compilation => {
      compilation.plugin('normal-module-loader', (loaderContext, module) => {
        // loaderContext.spriteHash = 'sprite'
      })

      compilation.plugin('optimize-modules', modules => {

      })
    })

    compiler.plugin('emit', (compilation, callback) => {
      callback()
    })
  }
}
