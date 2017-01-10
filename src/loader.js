'use strict'

const loaderUtils = require('loader-utils')
const assign = require('lodash.assign')

module.exports = function (content) {
  const config = loaderUtils.getLoaderConfig(this, this.options ? 'pxrem' : '')

  console.log(this.emiliaContext)
  return content
}
