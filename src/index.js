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
        const fromJS = subIndex === 0


        if (mark) {
          const buf = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcBAMAAABv4amZAAAAGFBMVEUAAAD86Fj86Fj86Fj86Fj86Fj86Fj86FgF5RrBAAAAB3RSTlMAWofdpe+PVNsiFgAAAB1JREFUGNNjEC9HBg4Dwi81hoEEML+IAQ5G+fj5AAqDW9eAaVTQAAAAAElFTkSuQmCC', 'base64')
          const p = path.join(__dirname, '../.extract', `${mark}.png`)
          fs.writeFileSync(p, buf, 'binary')
        }

        if (fromJS) {
          return callback(null, {
            ...data,
            request: `./${mark}.png`,
            context: path.join(__dirname, '../.extract')
          })
        } else if (subIndex === -1 || !mark) {
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
