import path from 'path'
import postcss from 'postcss'
import loaderUtils from 'loader-utils'
import storage from './storage'

module.exports = function (content) {
  const config = loaderUtils.getLoaderConfig(this, this.options ? 'emilia' : '')
  const root = postcss.parse(content)
  const context = this.emiliaContext

  storage.generate()

  root.walkDecls(/background(-image)?$/, decl => {
    const { value } = decl
    const start = value.indexOf('url(')
    const end = value.indexOf(')')
    const [url, tag] = value.substring(start + 4, end).replace(/^[\s"']|[\s"']$/g, '').split('?__')
    if (!tag) {
      return
    }

    const realpath = path.join(context, url)
    const result = storage.get(tag)

    if (!result) {
      return
    }

    const coordinate = result.coordinates.filter(item => item.meta === realpath)[0]
    if (!coordinate) {
      return
    }

    const parent = decl.parent
    const size = result.width + 'px ' + result.height + 'px'
    const position = (0 - coordinate.x) + 'px ' + (0 - coordinate.y) + 'px'

    parent.walkDecls(/background-(size|position)/, d => d.remove())
    parent.insertAfter(decl, {
      prop: 'background-position',
      value: position
    })
    parent.insertAfter(decl, {
      prop: 'background-size',
      value: size
    })
  })

  return root.toString()
}
