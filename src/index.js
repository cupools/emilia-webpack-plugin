import path from 'path'
import fs from 'fs'
import storage from './storage'

const REG = /\?__(\w+)$/

export default class EmiliaPlugin {
  apply(compiler) {
    const options = this.options || {}

    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('before-resolve', (data, callback) => {
        if (!data) {
          return callback()
        }

        const { request, context } = data
        const subIndex = request.indexOf('?__')

        const execResult = REG.exec(request)
        const mark = execResult && execResult[1]

        if (!request.includes('.png') || subIndex === -1 || !mark) {
          return callback(null, data)
        }

        const realpath = path.join(context, request.substr(0, subIndex))

        // Fix me, avoid starting generation each time.
        storage.add(mark, realpath)
        storage.generate()

        fs.writeFileSync(path.join(__dirname, '../.extract', `${mark}.png`), storage.get(mark).buffer, 'binary')

        return callback(null, {
          ...data,
          request: `./${mark}.png`,
          context: path.join(__dirname, '../.extract')
        })
      })

      nmf.plugin('after-resolve', (data, callback) => {
        return callback(null, data)
      })
    })

    compiler.plugin('compilation', compilation => {
      compilation.plugin('normal-module-loader', (loaderContext, module) => {
        Object.assign(loaderContext, { emiliaContext: module.context })
      })
    })

    compiler.plugin('emit', (compilation, callback) => {
      callback()
    })
  }
}
