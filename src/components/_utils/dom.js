export default {
  prepend(target, el) {
    if (target.firstChild) {
      target.insertBefore(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  },
  append(target, el) {
    target.appendChild(el)
  },
  nextTick(callback) {
    setTimeout(callback, 0)
  },
  clone(node, data) {
    const cloned = node.cloneNode(true)
    if (data) {
      Object.keys(data).forEach(key => {
        cloned.dataset[key] = data[key]
      })
    }
    return cloned
  }
}
