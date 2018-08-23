<template>
  <div :class="[_.tab, active && _.active]" @click="handleClick">
    <slot />
  </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view-if-needed'
import { isNil } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Tab',

  inject: {
    Tabs: {
      default: null
    }
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: parseInt
    },
    value: null
  },

  data: () => ({ isTab: true }),

  computed: {
    actualValue() {
      return isNil(this.value) ? this.localIndex : this.value
    },
    active() {
      return this.Tabs && this.Tabs.localValue === this.actualValue
    }
  },

  methods: {
    scrollIntoView(options) {
      scrollIntoView(this.$el, {
        scrollMode: 'if-needed',
        behavior: 'smooth',
        inline: 'center',
        ...options
      })
    },
    handleClick() {
      const { Tabs, actualValue, localIndex } = this
      if (Tabs) {
        const { $children: children, activeIndex } = Tabs
        let vnode = children[localIndex + (localIndex > activeIndex ? 1 : -1)]
        vnode = vnode && vnode.isTab ? vnode : this
        vnode.scrollIntoView()
        Tabs.sendValue(actualValue)
        Tabs.activeIndex = localIndex
      }
    }
  }
})
</script>
