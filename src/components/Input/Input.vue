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
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
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
      localValue,
      clearable,
      disabled,
      $attrs,
      $props,
      $listeners
    } = this

    return h('div', { class: _.holder }, [
      h(tag, {
        class: _.input,
        attrs: {
          ...$attrs,
          ...$props,
          value: undefined
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

