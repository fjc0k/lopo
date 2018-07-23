import Messenger from 'vue-messenger'

export default componentDefinition => {
  const componentName = componentDefinition.name

  // 注入组件名
  componentDefinition.name = `L${componentName}`

  componentDefinition.mixins = componentDefinition.mixins || []

  // 注入样式类名
  componentDefinition.mixins.push({
    computed: {
      _() {
        return {
          ...(this.$style || {}),
          ...(this.$options.classNames || {})
        }
      }
    }
  })

  // 注入 Messenger
  componentDefinition.mixins.push(Messenger)

  return componentDefinition
}
