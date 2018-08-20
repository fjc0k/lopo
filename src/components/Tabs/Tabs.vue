<template>
  <div :class="_.tabs">
    <IndexNodes :nodes="$slots.default" />
  </div>
</template>

<script>
import { find } from 'lodash'
import { createComponent } from '../_utils'
import IndexNodes from '../IndexNodes/IndexNodes.vue'

export default createComponent({
  name: 'Tabs',

  components: {
    IndexNodes
  },

  provide() {
    return {
      Tabs: this
    }
  },

  props: {
    value: {
      type: null,
      default: 0,
      on: {
        receive() {
          this.update()
        }
      }
    }
  },

  data: () => ({ activeIndex: 0 }),

  mounted() {
    this.update()
  },

  methods: {
    update() {
      this.$nextTick(() => {
        const activeVNode = find(this.$children, vnode => vnode.active)
        if (activeVNode) {
          activeVNode.scrollIntoView({
            behavior: 'instant'
          })
        }
      })
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tabs.styl" module />
