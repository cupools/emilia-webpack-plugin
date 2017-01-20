/* eslint-env mocha */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const Chai = require('chai')
const del = require('del')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
      loader: ExtractTextPlugin.extract('style', 'css!' + path.resolve('lib/loader.js'))
    }, {
      test: /\.png$/,
      loader: 'url?limit=10' + '!' + path.resolve('lib/img-loader.js')
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}

describe('EmiliaPlugin', function () {
  beforeEach(() => {
    del.sync(['.extract/*', 'test/tmp/*'])
  })

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
