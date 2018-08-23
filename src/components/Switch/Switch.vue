<template>
  <div :class="[_.switch, disabled && _.disabled]">
    <input
      :class="_.input"
      type="checkbox"
      v-model="isOn"
      :disabled="disabled"
      v-bind="$attrs"
    />
    <div :class="_.holder" />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Switch',

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'change'
  },

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
    disabled: Boolean
  },

  computed: {
    isOn: {
      get() {
        return this.localValue === this.onValue
      },
      set(state) {
        this.sendValue(state ? this.onValue : this.offValue)
      }
    }
  }
})
</script>

