<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Input',

  inheritAttrs: false,

  props: {
    value: null,
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    clearable: Boolean
  },

  computed: {
    tag() {
      return this.type === 'textarea' ? 'textarea' : 'input'
    }
  },

  methods: {
    handleInput({ target: { composing, value: newValue } }) {
      if (!composing && newValue !== this.localValue) {
        this.sendValue(newValue)
      }
    },
    handleClear(e) {
      e.stopPropagation()
      this.sendValue('')
    }
  },

  render(h) {
    const {
      _,
      tag,
      type,
      localValue,
      clearable,
      disabled,
      $attrs,
      $listeners
    } = this

    return h('div', { class: _.holder }, [
      h(tag, {
        class: _.input,
        attrs: {
          ...$attrs,
          type,
          disabled
        },
        domProps: {
          value: localValue
        },
        on: {
          ...$listeners,
          input: this.handleInput
        }
      }),
      clearable && !disabled && localValue && h('div', {
        class: _.clearer,
        on: {
          click: this.handleClear
        }
      })
    ])
  }
})
</script>

<style lang="stylus" src="../_styles/components/Input.styl" module />
