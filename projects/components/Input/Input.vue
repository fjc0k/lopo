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
    handleInput({ target: { value: newValue } }) {
      if (newValue !== this.localValue) {
        this.sendValue(newValue)
      }
    },
    handleClear() {
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

    return h('div', { class: _.input }, [
      h(tag, {
        class: _.holder,
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
