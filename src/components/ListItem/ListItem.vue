<template>
  <div :class="[
    _.listItem,
    localTappable && _.tappable,
    List.noDivider && _.noDivider,
    List.longDivider && _.longDivider
  ]" v-feedback="_.active">
    <div :class="_.icon" v-if="$slots.icon || icon">
      <slot name="icon">
        <Icon :name="icon" />
      </slot>
    </div>
    <div :class="_.body">
      <div :class="_.left" v-if="$slots.title || title || $slots.desc || desc">
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
      <div :class="_.value">
        <slot />
      </div>
      <div :class="_.extra" v-if="$slots.extra || extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
      <Icon :class="_.chevron" name="lopo-chevron" v-if="isLink" />
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
