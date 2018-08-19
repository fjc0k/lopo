import * as components from './components'
import * as services from './services'
import * as directives from './directives'

export default {
  addIcon: components.Icon.add,
  install(Vue) {
    Object.keys(components).forEach(componentName => {
      const component = components[componentName]
      Vue.component(component.name, component)
    })
    Object.keys(services).forEach(serviceName => {
      const service = services[serviceName]
      Vue.prototype[`$${serviceName}`] = service(Vue)
    })
    Object.keys(directives).forEach(directiveName => {
      const directive = directives[directiveName]
      Vue.directive(directiveName, directive)
    })
  }
}
