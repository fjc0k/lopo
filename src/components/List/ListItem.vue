<template>
  <div :class="[
    _['list-item'],
    localFeedback && _.feedback,
    List.noDivider && _['no-divider'],
    List.longDivider && _['long-divider']
  ]" v-feedback="_.active">
    <div :class="_.header" v-if="$slots.icon || icon">
      <slot name="icon">
        <Icon :name="icon" />
      </slot>
    </div>
    <div :class="_.body">
      <div :class="_.title" :style="titleStyle" v-if="$slots.title || $isNotEmpty(title)">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="_.value" v-if="$slots.default">
        <slot />
      </div>
      <div :class="_.extra" v-if="$slots.extra || $isNotEmpty(extra)">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
      <Icon :class="_.chevron" name="l-chevron" v-if="arrow" />
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
    extra: null,
    titleStyle: null,
    arrow: Boolean,
    feedback: {
      type: Boolean,
      transform(feedback) {
        return this.arrow || feedback
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

<style lang="stylus" src="../_styles/components/ListItem.module.styl" module />
