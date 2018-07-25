export default ({ Vue, Component }) => {
  return (options, children) => {
    const instance = new Vue({
      name: Component.name,
      computed: {
        options() {
          options.on = options.on || {}
          options.on.hide = () => {
            this.$destroy()
          }
          return options
        }
      },
      render(h) {
        return h(Component, this.options, children)
      },
      el: document.createElement('div')
    })

    document.body.appendChild(instance.$el)

    return instance.$children[0]
  }
}
