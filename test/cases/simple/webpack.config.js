const EmiliaPlugin = require('../../../')

module.exports = {
  context: __dirname,
  entry: './index.js',
  plugins: [
    new EmiliaPlugin()
  ]
}
