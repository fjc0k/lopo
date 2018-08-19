function addActiveClass(el) {
  el.classList.add(el.dataset.activeClass)
}

function removeActiveClass(el) {
  el.classList.remove(el.dataset.activeClass)
}

function bind(el) {
  const options = { passive: true }
  // store
  const _addActiveClass = addActiveClass.bind(null, el)
  const _removeActiveClass = removeActiveClass.bind(null, el)
  el._addActiveClass = _addActiveClass
  el._removeActiveClass = _removeActiveClass
  // add
  el.addEventListener('touchstart', _addActiveClass, options)
  el.addEventListener('mousedown', _addActiveClass, options)
  // remove
  el.addEventListener('touchmove', _removeActiveClass, options)
  el.addEventListener('touchcancel', _removeActiveClass, options)
  el.addEventListener('touchend', _removeActiveClass, options)
  el.addEventListener('mouseup', _removeActiveClass, options)
  el.addEventListener('mouseleave', _removeActiveClass, options)
}

function unbind(el) {
  const _addActiveClass = el._addActiveClass
  const _removeActiveClass = el._removeActiveClass
  el.removeEventListener('touchstart', _addActiveClass)
  el.removeEventListener('mousedown', _addActiveClass)
  el.removeEventListener('touchmove', _removeActiveClass)
  el.removeEventListener('touchcancel', _removeActiveClass)
  el.removeEventListener('touchend', _removeActiveClass)
  el.removeEventListener('mouseup', _removeActiveClass)
  el.removeEventListener('mouseleave', _removeActiveClass)
  delete el._addActiveClass
  delete el._removeActiveClass
}

export default {
  bind(el, { value }) {
    el.dataset.activeClass = value
    bind(el)
  },
  update(el, { value }) {
    el.dataset.activeClass = value
  },
  unbind(el) {
    unbind(el)
  }
}
