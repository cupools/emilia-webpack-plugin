import sprite from 'sprite-tool'
import fs from 'fs'

export default {
  store: {},
  add(mark, realpath) {
    if (!this.store[mark]) {
      this.store[mark] = {
        dependences: [],
        buffer: null,
        coordinates: null,
        width: 0,
        height: 0
      }
    }

    this.store[mark].dependences.push(realpath)
  },
  get(mark) {
    return this.store[mark]
  },
  generate() {
    const { store } = this

    Object.keys(store).forEach(
      mark => {
        const { dependences } = store[mark]
        const buffers = dependences.map(p => fs.readFileSync(p))
        const result = sprite({}, buffers, dependences)

        Object.assign(store, {
          [mark]: { dependences, ...result }
        })
      }
    )
  },
  clear() {
    this.store = {}
  }
}
