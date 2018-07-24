<template>
  <div :class="_.item">
    <div :class="_.left">
      <div :class="_.icon" v-if="$slots.icon || icon">
        <slot name="icon">
          {{ icon }}
        </slot>
      </div>
    </div>
    <div :class="_.body">
      <div :class="_.center">
        <div :class="_.title">
          <slot />
        </div>
        <div :class="_.desc" v-if="$slots.desc || desc">
          <slot name="desc">
            {{ desc }}
          </slot>
        </div>
      </div>
      <div :class="_.right">
        <div :class="_.extra" v-if="$slots.extra || extra">
          <slot name="extra">
            {{ extra }}
          </slot>
        </div>
        <div :class="_.chevron" />
      </div>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'ListItem',

  props: {
    icon: null,
    desc: null,
    extra: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/ListItem.styl" module />
