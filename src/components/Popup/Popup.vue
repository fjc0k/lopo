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
        @click="handleMaskClick">
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

const positions = ['center', 'top', 'right', 'bottom', 'left']
let zIndex = 5000

export default createComponent({
  name: 'Popup',

  hidable: true,

  renderToBody: true,

  maskProps: {
    closable: true,
    transparent: false,
    through: false
  },

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
    }
  },

  computed: {
    transitions() {
      const { _ } = this
      return positions.reduce((transitions, position) => {
        transitions[position] = {
          enterClass: _[`${position}Enter`],
          enterActiveClass: _[`${position}EnterActive`],
          leaveActiveClass: _[`${position}LeaveActive`],
          leaveToClass: _[`${position}LeaveTo`]
        }
        return transitions
      }, {})
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

