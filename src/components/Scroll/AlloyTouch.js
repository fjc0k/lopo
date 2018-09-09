/* eslint no-throw-literal: 0, no-useless-call: 0, no-multi-assign: 0, camelcase: 0, valid-jsdoc: 0, complexity: 0, max-depth: 0, no-negated-condition: 0, max-params: 0 */

/* AlloyTouch v0.2.5
 * By AlloyTeam http://www.alloyteam.com/
 * Github: https://github.com/AlloyTeam/AlloyTouch
 * MIT Licensed.
 *
 * modified by Jay Fong (@fjc0k)
 *
 */

if (!Date.now) {
  Date.now = function () {
    return new Date().getTime()
  }
}

const vendors = ['webkit', 'moz']
for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
  const vp = vendors[i]
  window.requestAnimationFrame = window[`${vp}RequestAnimationFrame`]
  window.cancelAnimationFrame = (window[`${vp}CancelAnimationFrame`]
                                 || window[`${vp}CancelRequestAnimationFrame`])
}

if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
      || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
  let lastTime = 0
  window.requestAnimationFrame = function (callback) {
    const now = Date.now()
    const nextTime = Math.max(lastTime + 16, now)
    return setTimeout(function () {
      callback(lastTime = nextTime)
    },
    nextTime - now)
  }
  window.cancelAnimationFrame = clearTimeout
}

function bind(element, type, callback) {
  element.addEventListener(type, callback, false)
}

function unbind(element, type, callback) {
  element.removeEventListener(type, callback)
}

function ease(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2))
}

function reverseEase(y) {
  return 1 - Math.sqrt(1 - y * y)
}

function preventDefaultTest(el, exceptions) {
  for (const i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true
    }
  }
  return false
}

const AlloyTouch = function (option) {
  this.element = typeof option.touch === 'string' ? document.querySelector(option.touch) : option.touch
  this.target = this._getValue(option.target, this.element)
  this.vertical = this._getValue(option.vertical, true)
  this.property = option.property
  this.tickID = 0

  this.initialValue = this._getValue(option.initialValue, this.target[this.property])
  this.target[this.property] = this.initialValue
  this.fixed = this._getValue(option.fixed, false)
  this.sensitivity = this._getValue(option.sensitivity, 1)
  this.moveFactor = this._getValue(option.moveFactor, 1)
  this.factor = this._getValue(option.factor, 1)
  this.outFactor = this._getValue(option.outFactor, 0.3)
  this.min = option.min
  this.max = option.max
  this.deceleration = 0.0006
  this.maxRegion = this._getValue(option.maxRegion, 600)
  this.springMaxRegion = this._getValue(option.springMaxRegion, 60)
  this.maxSpeed = option.maxSpeed
  this.hasMaxSpeed = !(this.maxSpeed === void 0)
  this.lockDirection = this._getValue(option.lockDirection, true)

  const noop = function () { }
  this.change = option.change || noop
  this.touchEnd = option.touchEnd || noop
  this.touchStart = option.touchStart || noop
  this.touchMove = option.touchMove || noop
  this.touchCancel = option.touchCancel || noop
  this.reboundEnd = option.reboundEnd || noop
  this.animationEnd = option.animationEnd || noop
  this.correctionEnd = option.correctionEnd || noop
  this.tap = option.tap || noop
  this.pressMove = option.pressMove || noop

  this.preventDefault = this._getValue(option.preventDefault, true)
  this.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
  this.hasMin = !(this.min === void 0)
  this.hasMax = !(this.max === void 0)
  if (this.hasMin && this.hasMax && this.min > this.max) {
    throw "the min value can't be greater than the max value."
  }
  this.isTouchStart = false
  this.step = option.step
  this.inertia = this._getValue(option.inertia, true)

  this._calculateIndex()

  this.eventTarget = window
  if (option.bindSelf) {
    this.eventTarget = this.element
  }

  this._startHandler = this._start.bind(this)
  this._moveHandler = this._move.bind(this)
  this._endHandler = this._end.bind(this)
  this._cancelHandler = this._cancel.bind(this)

  bind(this.element, 'touchstart', this._startHandler)
  bind(this.eventTarget, 'touchend', this._endHandler)
  bind(this.eventTarget, 'touchcancel', this._cancelHandler)
  this.eventTarget.addEventListener('touchmove', this._moveHandler, { passive: false, capture: false })
  this.x1 = this.x2 = this.y1 = this.y2 = null
}
AlloyTouch.prototype = {
  _getValue: function (obj, defaultValue) {
    return obj === void 0 ? defaultValue : obj
  },
  stop: function () {
    cancelAnimationFrame(this.tickID)
    this._calculateIndex()
  },
  _start: function (evt) {
    this.isTouchStart = true
    this.touchStart.call(this, evt, this.target[this.property])
    cancelAnimationFrame(this.tickID)
    this._calculateIndex()
    this.startTime = new Date().getTime()
    this.x1 = this.preX = evt.touches[0].pageX
    this.y1 = this.preY = evt.touches[0].pageY
    this.start = this.vertical ? this.preY : this.preX
    this._firstTouchMove = true
    this._preventMove = false
  },
  _move: function (evt) {
    if (this.isTouchStart) {
      const len = evt.touches.length

      const currentX = evt.touches[0].pageX

      const currentY = evt.touches[0].pageY

      if (this._firstTouchMove) {
        if (this.lockDirection) {
          const dDis = Math.abs(currentX - this.x1) - Math.abs(currentY - this.y1)
          if (dDis > 0 && this.vertical) {
            this._preventMove = true
          } else if (dDis < 0 && !this.vertical) {
            this._preventMove = true
          }
        }
        this._firstTouchMove = false
      }
      if (!this._preventMove) {
        let d = (this.vertical ? currentY - this.preY : currentX - this.preX) * this.sensitivity
        let f = this.moveFactor
        if (this.hasMax && this.target[this.property] > this.max && d > 0) {
          f = this.outFactor
        } else if (this.hasMin && this.target[this.property] < this.min && d < 0) {
          f = this.outFactor
        }
        d *= f
        this.preX = currentX
        this.preY = currentY
        if (!this.fixed) {
          this.target[this.property] += d
        }
        this.change.call(this, this.target[this.property])
        const timestamp = new Date().getTime()
        if (timestamp - this.startTime > 300) {
          this.startTime = timestamp
          this.start = this.vertical ? this.preY : this.preX
        }
        this.touchMove.call(this, evt, this.target[this.property])
      }

      if (this.preventDefault && !this._preventMove /* 保持另一边滑动 (Jay Fong) */ && !preventDefaultTest(evt.target, this.preventDefaultException)) {
        evt.preventDefault()
      }

      if (len === 1) {
        if (this.x2 !== null) {
          evt.deltaX = currentX - this.x2
          evt.deltaY = currentY - this.y2
        } else {
          evt.deltaX = 0
          evt.deltaY = 0
        }
        this.pressMove.call(this, evt, this.target[this.property])
      }
      this.x2 = currentX
      this.y2 = currentY
    }
  },
  _cancel: function (evt) {
    const current = this.target[this.property]
    this.touchCancel.call(this, evt, current)
    this._end(evt)
  },
  to: function (v, time, user_ease) {
    this._to(v, this._getValue(time, 600), user_ease || ease, this.change, function (value) {
      this._calculateIndex()
      this.reboundEnd.call(this, value)
      this.animationEnd.call(this, value)
    }.bind(this))
  },
  // 滚动去 index (Jay Fong)
  toIndex(index, time, user_ease) {
    if (this.step === void 0) return
    this.to(-(index * this.step), time, user_ease)
  },
  _calculateIndex: function () {
    if (this.hasMax && this.hasMin) {
      this.currentPage = Math.round((this.max - this.target[this.property]) / this.step)
    }
  },
  _end: function (evt) {
    if (this.isTouchStart) {
      this.isTouchStart = false
      const self = this

      const current = this.target[this.property]

      const triggerTap = (Math.abs(evt.changedTouches[0].pageX - this.x1) < 30 && Math.abs(evt.changedTouches[0].pageY - this.y1) < 30)
      if (triggerTap) {
        this.tap.call(this, evt, current)
      }
      if (this.touchEnd.call(this, evt, current, this.currentPage) === false) return
      if (this.hasMax && current > this.max) {
        this._to(this.max, 200, ease, this.change, function (value) {
          this.reboundEnd.call(this, value)
          this.animationEnd.call(this, value)
        }.bind(this))
      } else if (this.hasMin && current < this.min) {
        this._to(this.min, 200, ease, this.change, function (value) {
          this.reboundEnd.call(this, value)
          this.animationEnd.call(this, value)
        }.bind(this))
      } else if (this.inertia && !triggerTap && !this._preventMove) {
        const dt = new Date().getTime() - this.startTime
        if (dt < 300) {
          const distance = ((this.vertical ? evt.changedTouches[0].pageY : evt.changedTouches[0].pageX) - this.start) * this.sensitivity

          const speed = Math.abs(distance) / dt

          let speed2 = this.factor * speed
          if (this.hasMaxSpeed && speed2 > this.maxSpeed) {
            speed2 = this.maxSpeed
          }
          let destination = current + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1)

          let tRatio = 1
          if (destination < this.min) {
            if (destination < this.min - this.maxRegion) {
              tRatio = reverseEase((current - this.min + this.springMaxRegion) / (current - destination))
              destination = this.min - this.springMaxRegion
            } else {
              tRatio = reverseEase((current - this.min + this.springMaxRegion * (this.min - destination) / this.maxRegion) / (current - destination))
              destination = this.min - this.springMaxRegion * (this.min - destination) / this.maxRegion
            }
          } else if (destination > this.max) {
            if (destination > this.max + this.maxRegion) {
              tRatio = reverseEase((this.max + this.springMaxRegion - current) / (destination - current))
              destination = this.max + this.springMaxRegion
            } else {
              tRatio = reverseEase((this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion - current) / (destination - current))
              destination = this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion
            }
          }
          const duration = Math.round(speed / self.deceleration) * tRatio

          self._to(Math.round(destination), duration, ease, self.change, function (value) {
            if (self.hasMax && self.target[self.property] > self.max) {
              cancelAnimationFrame(self.tickID)
              self._to(self.max, 600, ease, self.change, self.animationEnd)
            } else if (self.hasMin && self.target[self.property] < self.min) {
              cancelAnimationFrame(self.tickID)
              self._to(self.min, 600, ease, self.change, self.animationEnd)
            } else if (self.step) {
              self._correction()
            } else {
              self.animationEnd.call(self, value)
            }

            self.change.call(this, value)
          })
        } else {
          self._correction()
        }
      } else {
        self._correction()
      }
      // if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {
      //     evt.preventDefault();
      // }
    }
    this.x1 = this.x2 = this.y1 = this.y2 = null
  },
  _to: function (value, time, ease, onChange, onEnd) {
    if (this.fixed) return
    const el = this.target

    const property = this.property
    const current = el[property]
    const dv = value - current
    const beginTime = new Date()
    const self = this
    const toTick = function () {
      const dt = new Date() - beginTime
      if (dt >= time) {
        el[property] = value
        onChange && onChange.call(self, value)
        onEnd && onEnd.call(self, value)
        return
      }
      el[property] = dv * ease(dt / time) + current
      self.tickID = requestAnimationFrame(toTick)
      // cancelAnimationFrame必须在 tickID = requestAnimationFrame(toTick);的后面
      onChange && onChange.call(self, el[property])
    }
    toTick()
  },
  _correction: function (time = 400 /* 支持传入 time (Jay Fong) */) {
    if (this.step === void 0) return
    const el = this.target

    const property = this.property
    const value = el[property]
    const rpt = Math.floor(Math.abs(value / this.step))
    const dy = value % this.step
    if (Math.abs(dy) > this.step / 2) {
      this._to((value < 0 ? -1 : 1) * (rpt + 1) * this.step, time, ease, this.change, function (value) {
        this._calculateIndex()
        this.correctionEnd.call(this, value)
        this.animationEnd.call(this, value)
      }.bind(this))
    } else {
      this._to((value < 0 ? -1 : 1) * rpt * this.step, time, ease, this.change, function (value) {
        this._calculateIndex()
        this.correctionEnd.call(this, value)
        this.animationEnd.call(this, value)
      }.bind(this))
    }
  },
  // 获得 index (Jay Fong)
  getIndex(value) {
    return this.step ? Math.round(Math.abs(value / this.step)) : 0
  },
  // 销毁方法 (Jay Fong)
  destroy: function () {
    unbind(this.element, 'touchstart', this._startHandler)
    unbind(this.eventTarget, 'touchmove', this._moveHandler)
    unbind(this.eventTarget, 'touchend', this._endHandler)
    unbind(this.eventTarget, 'touchcancel', this._cancelHandler)
  }
}

export default AlloyTouch
