<script>
import { createComponent, chunk } from '../_utils'
import GridItem from '../GridItem/GridItem.vue'

export default createComponent({
  name: 'Grid',

  provide() {
    return {
      Grid: this
    }
  },

  props: {
    cols: {
      numeric: true,
      default: 4
    },
    rows: {
      numeric: true,
      default: 0
    },
    noBorder: Boolean,
    noDivider: Boolean,
    noVerticalDivider: Boolean,
    noHorizontalDivider: Boolean,
    adaptive: Boolean
  },

  render() {
    const { _, cols, noBorder } = this
    return (
      <div class={[_.grid, noBorder && _.noBorder]}>
        {chunk(this.$slots.default, cols, <GridItem noFeedback />).map(group => (
          <div class={_.group}>
            {group}
          </div>
        ))}
      </div>
    )
  }
})
</script>

<style lang="stylus" src="../_styles/components/Grid.styl" module />
