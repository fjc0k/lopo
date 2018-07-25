import Messenger from 'vue-messenger'

const appendToBody = function () {
  if (!this._isDestroyed && (!this.$el.parentNode || this.$el.parentNode !== document.body)) {
    document.body.appendChild(this.$el)
  }
}

const removeFromBody = function () {
  if (this.$options.hidable && this.visible === true) {
    this.hide().then(() => document.body.removeChild(this.$el))
  } else {
    document.body.removeChild(this.$el)
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

  // 初始化混入
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

  // hidable 组件
  if (componentDefinition.hidable) {
    componentDefinition.mixins.push({
      model: {
        prop: 'visible',
        event: 'change'
      },
      props: {
        visible: {
          type: Boolean,
          default: (
            typeof componentDefinition.hidable === 'object'
              ? componentDefinition.hidable.default
              : false
          )
        }
      },
      methods: {
        show() {
          return new Promise(resolve => {
            this.sendVisible(true)
            setTimeout(resolve, 320)
          })
        },
        hide() {
          return new Promise(resolve => {
            this.sendVisible(false)
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
      mounted: appendToBody,
      updated: appendToBody,
      activated: appendToBody,
      deactivated: removeFromBody,
      beforeDestroy: removeFromBody
    })
  }

  return componentDefinition
}
