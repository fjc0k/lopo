<template>
  <div :class="_.previewItem">
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

  props: {
    title: null,
    value: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/PreviewItem.module.styl" module />
