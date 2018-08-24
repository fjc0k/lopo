import { reduce, includes } from 'lodash'

const optionsKeys = [
  'class',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopedSlots',
  'slot',
  'key',
  'ref'
]

export default ({ Vue, Component }) => {
  return (options, children = {}) => {
    const instance = new Vue({
      name: Component.name,
      computed: {
        options() {
          const normalizedOptions = reduce(options, (normalizedOptions, value, key) => {
            if (key !== 'attrs') {
              if (includes(optionsKeys, key)) {
                normalizedOptions[key] = value
              } else {
                normalizedOptions.attrs[key] = value
              }
            }
            return normalizedOptions
          }, {
            on: {},
            attrs: {
              ...options.attrs
            }
          })
          normalizedOptions.on['after-hide'] = () => {
            this.$destroy()
            this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
          }
          return normalizedOptions
        },
        slots() {
          const h = this.$createElement
          return Object.keys(children).map(slot => {
            const vnode = children[slot]
            return h('template', { slot }, [
              typeof vnode === 'function' ? vnode(h) : vnode
            ])
          })
        }
      },
      render(h) {
        return h(Component, this.options, this.slots)
      },
      el: document.createElement('div')
    })

    document.body.appendChild(instance.$el)

    return Promise.resolve(instance.$children[0])
  }
}
