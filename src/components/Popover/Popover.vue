<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Popover',

  renderToBody: 'popper',

  hidable: true,

  props: {
    placement: {
      type: String,
      enum: [
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'auto-start',
        'top-start',
        'right-start',
        'bottom-start',
        'left-start',
        'auto-end',
        'top-end',
        'right-end',
        'bottom-end',
        'left-end'
      ]
    },
    message: null
  },

  render() {
    const { _ } = this
    const child = this.$slots.default && this.$slots.default[0]
    if (!child) return null
    return <div>
      {child}
      <div
        ref="popper"
        class={[_.popover, _[placement]]}
        styleName="@popover $placement :visible"
        v-transfer-to-body>
        <div styleName="message">
          {this.$slots.message || this.message}
        </div>
        <div ref="arrow" styleName="arrow" />
      </div>
    </div>
  }
})
</script>

<style lang="stylus" src="../_styles/components/Popover.module.styl" module />
