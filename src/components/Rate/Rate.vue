<template>
  <div :class="_.rate">
    <div
      :class="[
        _.star,
        i <= localValue && _.selected
      ]"
      v-for="i in localCount"
      :key="i"
      @click="handleStarClick(i)">
      <Icon :name="icon" />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import Icon from '../Icon/Icon.vue'

export default createComponent({
  name: 'Rate',

  components: { Icon },

  props: {
    value: {
      numeric: true,
      default: 0
    },
    icon: {
      type: String,
      default: 'l-star'
    },
    count: {
      numeric: true,
      default: 5,
      transform: Number
    },
    readonly: Boolean
  },

  methods: {
    handleStarClick(i) {
      if (this.readonly) return
      this.sendValue(i)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Rate.styl" module />
