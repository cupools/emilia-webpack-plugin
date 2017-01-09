const EmiliaPlugin = require('../../../index')

module.exports = {
  context: __dirname,
  entry: './index.js',
  plugins: [
    new EmiliaPlugin()
  ]
}
