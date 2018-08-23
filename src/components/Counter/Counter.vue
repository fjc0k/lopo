<template>
  <div :class="_.counter">
    <div
      :class="[_.button, disableSubtract && _.disabled]"
      v-feedback="_.active"
      @click="handleSubtract">
      <Icon name="l-minus" />
    </div>
    <XInput
      type="number"
      :class="[_.input, disabled && _.disabled]"
      v-model="localValue"
      :readonly="readonly"
      :disabled="disabled"
    />
    <div
      :class="[_.button, disableAdd && _.disabled]"
      v-feedback="_.active"
      @click="handleAdd">
      <Icon name="l-plus" />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import { feedback } from '../../directives'
import Icon from '../Icon/Icon.vue'
import XInput from '../Input/Input.vue'

export default createComponent({
  name: 'Counter',

  directives: { feedback },

  components: {
    Icon,
    XInput
  },

  props: {
    value: {
      numeric: true,
      default: 0,
      transform: Number
    },
    min: {
      numeric: true,
      infinite: true,
      default: -Infinity,
      transform: Number
    },
    max: {
      numeric: true,
      infinite: true,
      default: Infinity,
      transform: Number
    },
    step: {
      numeric: true,
      default: 1,
      transform: Number
    },
    readonly: Boolean,
    disabled: Boolean
  },

  computed: {
    disableSubtract() {
      return this.disabled || (this.localValue - this.localStep < this.localMin)
    },
    disableAdd() {
      return this.disabled || (this.localValue + this.localStep > this.localMax)
    }
  },

  methods: {
    handleSubtract() {
      this.sendValue(this.localValue - this.localStep)
    },
    handleAdd() {
      this.sendValue(this.localValue + this.localStep)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Counter.module.styl" module />
