export default ({ Vue, Component }) => {
  return (options, children = {}) => {
    const instance = new Vue({
      name: Component.name,
      computed: {
        options() {
          options.on = options.on || {}
          options.on['after-hide'] = () => {
            this.$destroy()
          }
          return options
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

    return instance.$children[0]
  }
}
