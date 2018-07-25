export default ({
  Vue,
  Component
}) => {
  return function () {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    // eslint-disable-next-line
    new Vue({
      name: Component.name,
      render: h => h(Component, ...arguments),
      el: mountNode
    })
  }
}
