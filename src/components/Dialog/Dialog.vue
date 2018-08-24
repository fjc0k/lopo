<template>
  <Popup
    v-model="localVisible"
    position="center"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <div :class="_.dialog" v-show="localVisible">
      <div :class="_.header" v-if="$slots.title || $isNotEmpty(title)">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="_.body" v-if="$slots.default || $isNotEmpty(message)">
        <slot>{{ message }}</slot>
      </div>
      <div :class="_.footer">
        <slot name="footer">
          <template v-if="type !== 'default'">
            <DialogButton
              v-if="type !== 'alert'"
              @click="handleCancelClick">
              {{ cancelText }}
            </DialogButton>
            <DialogButton
              type="primary"
              @click="handleConfirmClick">
              {{ confirmText }}
            </DialogButton>
          </template>
        </slot>
      </div>
    </div>
  </Popup>
</template>

<script>
import { createComponent } from '../_utils'
import Popup from '../Popup/Popup.vue'
import DialogButton from './DialogButton.vue'

export default createComponent({
  name: 'Dialog',

  components: {
    Popup,
    DialogButton
  },

  hidable: true,

  maskProps: {
    closable: true,
    transparent: false,
    through: false
  },

  props: {
    type: {
      type: String,
      enum: ['default', 'alert', 'confirm', 'prompt']
    },
    title: null,
    message: null,
    cancelText: {
      type: null,
      default: '取消'
    },
    confirmText: {
      type: null,
      default: '确认'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleCancelClick() {
      this.$emit('cancel')
      this.sendVisible(false)
    },
    handleConfirmClick() {
      const done = () => this.sendVisible(false)
      if (this.autoClose) {
        this.$emit('confirm')
        done()
      } else {
        this.$emit('confirm', done)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Dialog.module.styl" module />
