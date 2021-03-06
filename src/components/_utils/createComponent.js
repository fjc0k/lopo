import Messenger from 'vue-messenger'
import { castArray, omit, isNil } from 'lodash'

const appendToBody = function (el) {
  const node = el === true ? this.$el : this.$refs[el]
  if (!this._isDestroyed && (!node.parentNode || node.parentNode !== document.body)) {
    document.body.appendChild(node)
  }
}

const removeFromBody = function (el) {
  const node = el === true ? this.$el : this.$refs[el]
  if (this.$options.hidable && this.visible === true) {
    this.hide().then(() => node.parentNode && node.parentNode.removeChild(node))
  } else {
    node.parentNode && node.parentNode.removeChild(node)
  }
}

const getMaskProps = ({ closable = true, transparent = false, through = false } = {}) => ({
  maskClosable: {
    type: Boolean,
    default: closable
  },
  maskTransparent: {
    type: Boolean,
    default: transparent
  },
  maskThrough: {
    type: Boolean,
    default: through
  }
})

export default componentDefinition => {
  const componentName = componentDefinition.name

  // 注入组件名
  componentDefinition.name = `L${componentName}`

  if (componentDefinition.functional) {
    return componentDefinition
  }

  // 初始化混入
  componentDefinition.mixins = componentDefinition.mixins || []

  // 注入样式类名及常用方法
  componentDefinition.mixins.push({
    computed: {
      _() {
        return {
          ...(this.$style || {}),
          ...(this.$options.classNames || {})
        }
      },
      $attrsAll() {
        // vue 的 $attrs 并不会将 value 纳入
        return {
          value: this.$vnode.data.model.value,
          ...this.$attrs
        }
      }
    },
    methods: {
      $passListeners(exclude) {
        const listeners = this.$listeners
        return exclude ? omit(listeners, castArray(exclude)) : listeners
      },
      $isEmpty(value) {
        return isNil(value) || value === ''
      },
      $isNotEmpty(value) {
        return !this.$isEmpty(value)
      },
      $goto(to, replace) {
        if (isNil(to)) return
        if (typeof to === 'string' && /^https?:\/\//i.test(to)) {
          location.href = to
        } else if (this.$router) {
          this.$router[replace ? 'replace' : 'push'](to)
        }
      }
    }
  })

  // 注入表单验证逻辑
  if (componentDefinition.formValidator) {
    componentDefinition.mixins.push({
      props: {
        noValidate: Boolean
      },
      inject: {
        Field: {
          default: null
        }
      },
      methods: {
        $validate() {
          if (!this.noValidate && this.Field) {
            this.Field.validate()
          }
        }
      }
    })
  }

  // 注入 Messenger
  componentDefinition.mixins.push(Messenger)

  // hidable 组件
  if (componentDefinition.hidable) {
    const hidableConfig = typeof componentDefinition.hidable === 'object' ? componentDefinition.hidable : {
      default: false
    }
    componentDefinition.mixins.push({
      ...(hidableConfig.sync ? {} : {
        model: {
          prop: 'visible',
          event: 'change'
        }
      }),
      props: {
        visible: {
          type: Boolean,
          default: hidableConfig.default,
          sync: hidableConfig.sync,
          on: {
            change(visible) {
              this.$nextTick(() => {
                this.$emit(visible ? 'show' : 'hide')
                setTimeout(() => {
                  this.$emit(visible ? 'after-show' : 'after-hide')
                }, 320)
              })
            }
          }
        }
      },
      methods: {
        show() {
          return new Promise(resolve => {
            this.sendVisible(true)
            // 待动画完成后再 resolve
            setTimeout(resolve, 320)
          })
        },
        hide() {
          return new Promise(resolve => {
            this.sendVisible(false)
            // 待动画完成后再 resolve
            setTimeout(resolve, 320)
          })
        }
      }
    })
  }

  // mask 属性
  if (componentDefinition.maskProps) {
    componentDefinition.mixins.push({
      props: getMaskProps(componentDefinition.maskProps)
    })
  }

  // 注入 body
  if (componentDefinition.renderToBody) {
    componentDefinition.mixins.push({
      // 操作 DOM
      mounted() {
        appendToBody.call(this, componentDefinition.renderToBody)
      },
      updated() {
        appendToBody.call(this, componentDefinition.renderToBody)
      },
      beforeDestroy() {
        removeFromBody.call(this, componentDefinition.renderToBody)
      },

      // 兼容 <keep-alive />
      deactivated() {
        if (componentDefinition.hidable && this.localVisible) {
          this.shouldRestoreVisibility = true
          this.sendVisible(false)
        } else {
          this.shouldRestoreVisibility = false
        }
      },
      activated() {
        if (this.shouldRestoreVisibility) {
          this.sendVisible(true)
        }
      }
    })
  }

  return componentDefinition
}
