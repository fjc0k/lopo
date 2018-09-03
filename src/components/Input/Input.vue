<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Input',

  inheritAttrs: false,

  formValidator: true,

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
    isDigitalType() {
      return this.type === 'digital'
    },
    nativeType() {
      return this.isDigitalType ? 'tel' : this.type
    },
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
    handleChange() {
      this.$validate()
    },
    handleClear(e) {
      e.stopPropagation()
      this.sendValue('')
    }
  },

  render(h) {
    const {
      _,
      isDigitalType,
      nativeType,
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
          ...(isDigitalType ? { pattern: '[0-9]*' } : {}),
          type: nativeType,
          value: undefined
        },
        domProps: {
          value: localValue
        },
        on: {
          ...$listeners,
          input: this.handleInput,
          change: this.handleChange
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

<style lang="stylus" src="../_styles/components/Input.module.styl" module />
