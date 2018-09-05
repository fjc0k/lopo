<template>
  <div :class="[_.switch, disabled && _.disabled]">
    <input
      :class="_.input"
      type="checkbox"
      :checked="isOn"
      :disabled="disabled"
      v-bind="$attrs"
      @click.prevent="handleChange"
    />
    <div :class="_.holder" />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Switch',

  inheritAttrs: false,

  props: {
    value: null,
    onValue: {
      type: null,
      default: true
    },
    offValue: {
      type: null,
      default: false
    },
    autoChange: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },

  computed: {
    isOn: {
      get() {
        return this.localValue === this.onValue
      },
      set(state) {
        const value = state ? this.onValue : this.offValue
        const done = () => this.sendValue(value)
        this.$emit('change', value, done)
        this.autoChange && done()
      }
    }
  },

  methods: {
    handleChange() {
      this.isOn = !this.isOn
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Switch.module.styl" module />
