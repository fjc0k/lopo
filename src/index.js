import * as components from './components'
import * as services from './services'

export default {
  install(Vue) {
    Object.keys(components).forEach(componentName => {
      const component = components[componentName]
      Vue.component(component.name, component)
    })
    Object.keys(services).forEach(serviceName => {
      const service = services[serviceName]
      Vue.prototype[`$${serviceName}`] = service(Vue)
    })
  }
}
