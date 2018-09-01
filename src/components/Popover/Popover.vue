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
    popperClass: null,
    popperStyle: null
  },

  methods: {
    createOrUpdatePopper() {
      if (!this.localVisible) {
        if (this.popper) {
          this.popper.destroy()
          this.popper = null
        }
        return
      }
      if (this.popper) {
        this.popper.options.placement = this.placement
        return this.popper.scheduleUpdate()
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
    if (this.popper) {
      this.popper.destroy()
      this.popper = null
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$el.firstChild) {
        this.target = this.$el.firstChild
        this.$el.parentNode.replaceChild(this.target, this.$el)
        this.createOrUpdatePopper()
      }
    })
  },

  updated() {
    this.createOrUpdatePopper()
  },

  render() {
    const { _, placement, localVisible, popperClass, popperStyle } = this
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
        ]}
        style={popperStyle}>
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
