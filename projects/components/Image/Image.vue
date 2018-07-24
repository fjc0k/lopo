<template>
  <div :class="[_.image, square && _.square, circle && _.circle]">
    <img :class="_.holder" :src="src" v-if="!square" />
    <div
      :class="[_.source, _[fit]]"
      :style="{ backgroundImage: `url(${src})` }"
    />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Image',

  props: {
    src: {
      type: String,
      required: true
    },
    fit: {
      type: String,
      enum: ['contain', 'cover', 'fill']
    },
    square: Boolean, // 此时，必须指定 width，否则，默认宽度 100%
    circle: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/Image.styl" module />
