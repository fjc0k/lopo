<template>
  <Popup
    v-model="localVisible"
    position="bottom"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div :class="_.sheet" v-show="localVisible">
      <!-- // 头部 -->
      <div :class="_.header" v-if="!noHeader">
        <!-- // 取消 -->
        <div :class="[_.action, _.cancel]" @click="handleCancelClick" v-if="!noCancel && (cancelText || $slots.cancel)">
          <slot name="cancel">
            {{ cancelText }}
          </slot>
        </div>
        <!-- // 信息 -->
        <div :class="_.message">
          <!-- // 标题 -->
          <div :class="_.title" v-if="title || $slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <!-- // 简介 -->
          <div :class="_.desc" v-if="desc || $slots.desc">
            <slot name="desc">
              {{ desc }}
            </slot>
          </div>
        </div>
        <!-- // 确认 -->
        <div :class="[_.action, _.confirm]" @click="handleConfirmClick" v-if="!noConfirm && (confirmText || $slots.confirm)">
          <slot name="confirm">
            {{ confirmText }}
          </slot>
        </div>
      </div>
      <!-- // 内容 -->
      <div :class="_.body">
        <slot />
      </div>
    </div>
  </Popup>
</template>

<script>
import { createComponent } from '../_utils'
import Popup from '../Popup/Popup.vue'

export default createComponent({
  name: 'Sheet',

  hidable: true,

  inheritAttrs: false,

  components: { Popup },

  maskProps: {
    closable: true,
    transparent: false,
    through: false
  },

  props: {
    title: null,
    desc: null,
    cancelText: {
      type: null,
      default: '取消'
    },
    confirmText: {
      type: null,
      default: '确定'
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    noHeader: Boolean,
    noCancel: Boolean,
    noConfirm: Boolean
  },

  methods: {
    handleCancelClick() {
      this.$emit('cancel')
      this.hide()
    },
    handleConfirmClick() {
      if (this.autoClose) {
        this.$emit('confirm')
        this.hide()
      } else {
        this.$emit('confirm', () => this.hide())
      }
    }
  }
})
</script>
