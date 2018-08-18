<template>
  <div :class="[
    _.listItem,
    localTappable && _.tappable,
    List.noDivider && _['no-divider'],
    List.longDivider && _['long-divider']
  ]" v-feedback="_.active">
    <div :class="_.left" v-if="$slots.icon || icon">
      <div :class="_.icon">
        <slot name="icon">
          <Icon :name="icon" />
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
import { feedback } from '../../directives'
import Icon from '../Icon/Icon.vue'

export default createComponent({
  name: 'ListItem',

  components: { Icon },

  directives: { feedback },

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
