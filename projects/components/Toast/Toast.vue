<template>
  <Popup
    v-model="localVisible"
    :position="position"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div
      :class="[
        _.toast,
        _[position],
        localIcon && _['with-icon'],
        !$slots.default && _['no-message']
      ]"
      v-show="localVisible">
      <div :class="_.icon" v-if="localIcon">
        <Icon :name="localIcon" />
      </div>
      <div :class="_.message" v-if="$slots.default">
        <slot />
      </div>
    </div>
  </Popup>
</template>

<script>
import { createComponent } from '../_utils'
import Popup from '../Popup/Popup.vue'
import Icon from '../Icon/Icon.vue'

const positions = ['center', 'top', 'bottom']

export default createComponent({
  name: 'Toast',

  components: {
    Popup,
    Icon
  },

  hidable: true,

  maskProps: {
    closable: false,
    transparent: true,
    through: false
  },

  props: {
    type: {
      type: String,
      enum: ['default', 'success', 'fail', 'loading']
    },
    icon: String,
    position: {
      type: String,
      enum: positions
    },
    duration: {
      numeric: true,
      default: 3000
    }
  },

  computed: {
    localIcon() {
      const { type } = this
      if (type === 'default') return this.icon
      return type === 'loading'
        ? 'lopo-loading'
        : type === 'success'
          ? 'lopo-success'
          : type === 'fail'
            ? 'lopo-fail'
            : null
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Toast.styl" module />
