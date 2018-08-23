<template>
  <div :class="[_.tabBarItem, active && _.active]" @click="handleClick">
    <Badge v-bind="badge">
      <div :class="_.icon">
        <slot name="icon" :active="active">
          <Icon :name="active && activeIcon ? activeIcon : icon" />
        </slot>
      </div>
    </Badge>
    <div :class="_.label" v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import Icon from '../Icon/Icon.vue'
import Badge from '../Badge/Badge.vue'

export default createComponent({
  name: 'TabBarItem',

  inject: {
    TabBar: {
      default: null
    }
  },

  components: {
    Icon,
    Badge
  },

  props: {
    icon: String,
    activeIcon: String,
    badge: {
      type: Object,
      default: () => ({})
    },
    index: {
      numeric: true,
      default: 0,
      transform: parseInt
    }
  },

  computed: {
    active() {
      return this.TabBar && this.TabBar.localIndex === this.localIndex
    }
  },

  methods: {
    handleClick() {
      this.TabBar && this.TabBar.sendIndex(this.localIndex)
    }
  }
})
</script>

