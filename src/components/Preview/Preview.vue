<template>
  <div :class="[_.preview, plain && _.plain, noBorder && _.noBorder]">
    <slot />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Preview',

  props: {
    plain: Boolean,
    noBorder: Boolean
  }
})
</script>
