<template>
  <div :class="[_.previewItem, Preview.plain && _.plain]">
    <div :class="_.title" v-if="title || $slots.title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="_.value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'PreviewItem',

  inject: {
    Preview: {
      default: () => ({})
    }
  },

  props: {
    title: null,
    value: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/PreviewItem.module.styl" module />
