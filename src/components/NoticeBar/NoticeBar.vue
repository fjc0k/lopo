<template>
  <div :class="_.noticeBar" @click="handleClick" v-if="localVisible">
    <div :class="_.left">
      <slot name="icon">
        <Icon :class="_.icon" :name="icon" />
      </slot>
    </div>
    <Marquee :class="_.content" v-bind="marquee">
      <slot />
    </Marquee>
    <div :class="_.action" @click="handleActionClick">
      <slot name="action">
        <Icon :class="_.icon" name="l-right" v-if="to" />
        <Icon :class="_.icon" name="l-close" v-else-if="closable" />
      </slot>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import Icon from '../Icon/Icon.vue'
import Marquee from '../Marquee/Marquee.vue'

export default createComponent({
  name: 'NoticeBar',

  hidable: {
    default: true
  },

  components: {
    Icon,
    Marquee
  },

  props: {
    icon: {
      type: String,
      default: 'l-sound'
    },
    to: [String, Object],
    marquee: {
      type: Object,
      default: () => ({})
    },
    closable: Boolean
  },

  methods: {
    handleClick() {
      if (this.to) {
        this.$goto(this.to)
      }
    },
    handleActionClick() {
      if (this.closable) {
        this.sendVisible(false)
        this.$emit('close')
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/NoticeBar.styl" module />
