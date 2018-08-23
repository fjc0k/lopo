<template>
  <label :class="_.choose">
    <input
      :class="_.input"
      :type="nativeType"
      v-model="localChosenValue"
      :value="localValue"
    />
    <div
      :class="[
        _.holder,
        _[nativeType],
        _[localShape]
      ]"
    />
    <div :class="_.label" v-if="$slots.default">
      <slot />
    </div>
  </label>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Choose',

  model: {
    prop: 'chosenValue',
    event: 'choose'
  },

  props: {
    chosenValue: null,
    value: null,
    type: {
      type: String,
      enum: ['auto', 'radio', 'checkbox', 'agree']
    },
    shape: {
      type: String,
      enum: ['auto', 'square', 'circle']
    },
    disabled: Boolean
  },

  computed: {
    localType() {
      return this.type === 'auto'
        ? (
          Array.isArray(this.chosenValue)
            ? 'checkbox'
            : typeof this.chosenValue === 'boolean'
              ? 'agree'
              : 'radio'
        )
        : this.type
    },
    nativeType() {
      return this.localType === 'radio' ? 'radio' : 'checkbox'
    },
    localShape() {
      return this.shape === 'auto'
        ? (this.localType === 'radio' ? 'circle' : 'square')
        : this.shape
    },
    localValue() {
      return this.localType === 'agree' ? true : this.value
    }
  }
})
</script>

