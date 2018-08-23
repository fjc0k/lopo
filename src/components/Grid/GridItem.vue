<template>
  <div :class="klass" v-feedback="_.active">
    <div :class="_.content">
      <div :class="_.thumbnail" v-if="icon || $slots.icon">
        <slot name="icon">
          <Icon :class="_.icon" :name="icon" />
        </slot>
      </div>
      <div :class="_.message">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import { feedback } from '../../directives'
import Icon from '../Icon/Icon.vue'

export default createComponent({
  name: 'GridItem',

  directives: { feedback },

  components: { Icon },

  inject: {
    Grid: {
      default: () => ({})
    }
  },

  props: {
    icon: String,
    noFeedback: Boolean
  },

  computed: {
    klass() {
      const { _, noFeedback, Grid } = this
      return [
        _.gridItem,
        noFeedback && _.noFeedback,
        Grid.adaptive || _.square,
        (Grid.noDivider || Grid.noVerticalDivider) && _.noVerticalDivider,
        (Grid.noDivider || Grid.noHorizontalDivider) && _.noHorizontalDivider
      ]
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/GridItem.module.styl" module />
