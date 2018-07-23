import * as components from './components'

export default {
  install(Vue) {
    Object.keys(components).forEach(componentName => {
      const component = components[componentName]
      Vue.component(component.name, component)
    })
  }
}
