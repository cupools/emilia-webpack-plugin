/* eslint-env mocha */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const Chai = require('chai')

Chai.should()

const cases = fs.readdirSync('test/cases')
  .filter(dir => fs.statSync(path.resolve('test/cases', dir)).isDirectory())
const defaultWebpackConfig = {
  output: {
    path: 'test/tmp',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.png$/,
      loader: 'url'
    }]
  }
}

describe('EmiliaPlugin', function () {
  this.timeout(Infinity)
  cases.forEach(function (testCase) {
    it(testCase, function (done) {
      const dir = path.resolve('test/cases', testCase)
      const webpackConfig = path.resolve(dir, 'webpack.config.js')
      const options = require(webpackConfig) // eslint-disable-line

      const opt = webpackMerge(defaultWebpackConfig, options)

      webpack(opt)
        .run(function (err, stat) {
          done()
        })
    })
  })
})
