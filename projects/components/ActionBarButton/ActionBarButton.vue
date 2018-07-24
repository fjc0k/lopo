<script>
import Button from '../Button/Button.vue'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'ActionBarButton',

  inheritAttrs: false,

  render(h) {
    return h(
      Button,
      {
        class: this._.button,
        attrs: {
          ...this.$attrs,
          shape: 'square',
          noBorder: true
        },
        on: { ...this.$listeners }
      },
      this.$slots.default
    )
  }
})
</script>

<style lang="stylus" src="../_styles/components/ActionBarButton.styl" module />
