<script>
import Popper from 'popper.js'
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
    message: null,
    popperClass: null
  },

  watch: {
    message: 'createPopper',
    placement: 'createPopper'
  },

  methods: {
    createPopper() {
      if (this.popper) {
        this.popper.destroy()
      }
      this.popper = new Popper(this.target, this.$refs.popper, {
        placement: this.placement,
        modifiers: {
          arrow: {
            element: this.$refs.arrow
          },
          flip: {
            enabled: false
          }
        }
      })
    }
  },

  beforeDestroy() {
    this.popper && this.popper.destroy()
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$el.firstChild) {
        this.target = this.$el.firstChild
        this.$el.parentNode.replaceChild(this.target, this.$el)
        this.createPopper()
      }
    })
  },

  updated() {
    this.createPopper()
  },

  render() {
    const { _, placement, localVisible, popperClass } = this
    const child = this.$slots.default && this.$slots.default[0]
    if (!child) return null
    return <div>
      {child}
      <div
        ref="popper"
        class={[
          _.popover,
          _[placement],
          localVisible && _.visible,
          popperClass
        ]}>
        <div class={_.message}>
          {this.$slots.message || this.message}
        </div>
        <div ref="arrow" class={_.arrow} />
      </div>
    </div>
  }
})
</script>

<style lang="stylus" src="../_styles/components/Popover.module.styl" module />
