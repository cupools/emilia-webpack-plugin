import fs from 'fs'
import loaderUtils from 'loader-utils'
import storage from './storage'

module.exports = function (content) {
  const config = loaderUtils.getLoaderConfig(this, this.options ? 'emilia' : '')
  const { resource } = this

  if (resource.indexOf('.extract') === -1) {
    return content
  }

  storage.generate()
  const buf = fs.readFileSync(resource)
  return Uint8Array.from(buf)
}

module.exports.raw = true
