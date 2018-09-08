<template>
  <div :class="_.head">
    <div :class="_.main" v-if="$slots.default">
      <slot />
    </div>
    <div :class="_.extra" v-if="$slots.extra || $isNotEmpty(extra)">
      <slot name="extra">
        {{ extra }}
      </slot>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Head',

  props: {
    extra: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/Head.module.styl" module />
