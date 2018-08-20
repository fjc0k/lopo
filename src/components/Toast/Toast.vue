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
        localIcon && _.withIcon,
        !$slots.default && _noMessage
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
      enum: ['default', 'success', 'error', 'loading']
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
    localDuration() {
      return this.type === 'loading' ? 0 : this.duration
    },
    localIcon() {
      const { type } = this
      if (type === 'default') return this.icon
      return type === 'loading'
        ? 'l-loading'
        : type === 'success'
          ? 'l-check-circle'
          : type === 'error'
            ? 'l-close-circle'
            : null
    }
  },

  methods: {
    timing(visible) {
      if (visible) {
        const { localDuration } = this
        if (localDuration > 0) {
          this.timer = setTimeout(this.hide, localDuration)
        }
      } else {
        clearTimeout(this.timer)
      }
    }
  },

  mounted() {
    this.$watch('localVisible', {
      immediate: true,
      handler: this.timing
    })
  }
})
</script>

<style lang="stylus" src="../_styles/components/Toast.styl" module />
