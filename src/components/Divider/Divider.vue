<template>
  <div :class="_.wrapper">
    <div :class="[_.divider, _[type], _[align], full && _.full]" :style="{ width }">
      <div :class="_.line" />
      <div :class="_.content" v-if="$slots.default">
        <slot />
      </div>
      <div :class="_.line" />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Divider',

  props: {
    type: {
      type: String,
      enum: ['solid', 'dashed', 'dotted']
    },
    align: {
      type: String,
      enum: ['center', 'left', 'right']
    },
    width: String,
    full: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/Divider.module.styl" module />
