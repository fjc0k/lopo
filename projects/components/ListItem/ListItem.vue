<template>
  <div :class="[
    _.item,
    localTappable && _.tappable,
    List.noDivider && _['no-divider'],
    List.longDivider && _['long-divider']
  ]">
    <div :class="_.left" v-if="$slots.icon || icon">
      <div :class="_.icon">
        <slot name="icon">
          {{ icon }}
        </slot>
      </div>
    </div>
    <div :class="_.body">
      <div :class="_.center">
        <div :class="_.caption" v-if="$slots.title || title || $slots.desc || desc">
          <div :class="_.title" v-if="$slots.title || title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div :class="_.desc" v-if="$slots.desc || desc">
            <slot name="desc">
              {{ desc }}
            </slot>
          </div>
        </div>
        <div :class="_.value" v-if="$slots.default">
          <slot />
        </div>
      </div>
      <div :class="_.right" v-if="$slots.extra || extra || isLink">
        <div :class="_.extra" v-if="$slots.extra || extra">
          <slot name="extra">
            {{ extra }}
          </slot>
        </div>
        <div :class="_.chevron" v-if="isLink" />
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
    title: null,
    desc: null,
    extra: null,
    isLink: Boolean,
    tappable: {
      type: Boolean,
      transform(tappable) {
        return this.isLink || tappable
      }
    }
  },

  inject: {
    List: {
      default: () => ({})
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/ListItem.styl" module />
