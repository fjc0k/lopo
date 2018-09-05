<template>
  <div :class="_.counter">
    <div
      :class="[_.button, disableSubtract && _.disabled]"
      v-feedback="_.active"
      @click="handleSubtract">
      <Icon name="l-minus" />
    </div>
    <XInput
      :class="[_.input, disabled && _.disabled]"
      v-model="localValue"
      type="number"
      :disabled="disableInput"
      @keydown="handleKeyPress"
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
    noInput: Boolean,
    disabled: Boolean
  },

  computed: {
    normalizedLocalValue() {
      return +this.localValue
    },
    disableSubtract() {
      return this.disabled || (this.normalizedLocalValue - this.localStep < this.localMin)
    },
    disableAdd() {
      return this.disabled || (this.normalizedLocalValue + this.localStep > this.localMax)
    },
    disableInput() {
      return this.disabled || this.noInput
    }
  },

  methods: {
    handleSubtract() {
      this.sendValue(this.normalizedLocalValue - this.localStep)
    },
    handleAdd() {
      this.sendValue(this.normalizedLocalValue + this.localStep)
    },
    handleKeyPress(e) {
      const { localValue, localMin, localMax } = this
      let value = e.target.value
      value = value && +value
      console.log(e)
      if (value !== localValue) {
        let newValue = value
        if (value !== '') {
          newValue = value < localMin
            ? localMin
            : value > localMax
              ? localMax
              : value
        }
        if (newValue !== value) {
          e.preventDefault()
        }
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Counter.module.styl" module />
