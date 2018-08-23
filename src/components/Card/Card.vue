<template>
  <div :class="[_.card, square && _.square]">
    <div :class="_.title" v-if="$slots.title || title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="_.content">
      <slot />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Card',

  props: {
    title: null,
    square: Boolean
  }
})
</script>

