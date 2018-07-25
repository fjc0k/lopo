<template>
  <div>
    <transition
      :appear="appear"
      v-bind="transitions.center">
      <div
        :class="[
          _.popup,
          _[position],
          maskThrough && _.through,
          maskTransparent && _.transparent
        ]"
        :style="{ zIndex }"
        v-show="localVisible"
        @click.passive="handleMaskClick">
        <transition
          :appear="appear"
          v-bind="transitions[position]"
          v-on="$listeners">
          <slot />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import maskProps from './maskProps'

const positions = ['center', 'top', 'right', 'bottom', 'left']
let zIndex = 5000

export default createComponent({
  name: 'Popup',

  hidable: true,

  renderToBody: true,

  props: {
    position: {
      type: String,
      enum: positions
    },
    zIndex: {
      numeric: true,
      default: () => zIndex++
    },
    appear: {
      type: Boolean,
      default: true
    },
    ...maskProps({
      closable: true,
      transparent: false,
      through: false
    })
  },

  computed: {
    transitions() {
      return positions.map(position => ({
        enterClass: `${position}-enter`,
        enterActiveClass: `${position}-enter-active`,
        leaveActiveClass: `${position}-leave-active`,
        leaveToClass: `${position}-leave-to`
      }))
    }
  },

  methods: {
    handleMaskClick(e) {
      if (e.target !== e.currentTarget) return
      this.$emit('mask-click', e)
      if (this.maskClosable) {
        this.sendVisible(false)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Popup.styl" module />
