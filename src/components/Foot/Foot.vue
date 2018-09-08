<template>
  <XHead v-bind="$attrs" :class="_.foot">
    <PassSlots />
  </XHead>
</template>

<script>
import { createComponent } from '../_utils'
import XHead from '../Head/Head.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'Foot',

  inheritAttrs: false,

  components: { XHead, PassSlots }
})
</script>

<style lang="stylus" src="../_styles/components/Foot.module.styl" module />
