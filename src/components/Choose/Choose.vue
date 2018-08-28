<script>
import { isNil, isArray, isBoolean, isFunction, findIndex } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Choose',

  model: {
    prop: 'chosenValue',
    event: 'choose'
  },

  props: {
    chosenValue: null,
    value: null,
    index: [String, Number, Function],
    type: {
      type: String,
      enum: ['auto', 'radio', 'checkbox', 'agree']
    },
    shape: {
      type: String,
      enum: ['auto', 'square', 'circle']
    },
    block: Boolean,
    disabled: Boolean
  },

  computed: {
    localType() {
      return this.type === 'auto'
        ? (
          isArray(this.localChosenValue)
            ? 'checkbox'
            : isBoolean(this.localChosenValue)
              ? 'agree'
              : 'radio'
        )
        : this.type
    },
    nativeType() {
      return this.localType === 'radio' ? 'radio' : 'checkbox'
    },
    localShape() {
      return this.shape === 'auto'
        ? (this.localType === 'radio' ? 'circle' : 'square')
        : this.shape
    },
    localValue() {
      return this.localType === 'agree' ? true : this.value
    },
    isChosen() {
      const { localType, index, localChosenValue, localValue } = this
      return (
        localType === 'checkbox'
          ? (
            isNil(index)
              ? localChosenValue.indexOf(localValue) > -1
              : localChosenValue.some(
                isFunction(index)
                  ? one => index(one) === index(localValue)
                  : one => one[index] === localValue[index]
              )
          )
          : localType === 'radio'
            ? (
              isNil(index)
                ? localChosenValue === localValue
                : isFunction(index)
                  ? index(localChosenValue) === index(localValue)
                  : localChosenValue[index] === localValue[index]

            )
            : localChosenValue
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { localType, localChosenValue, localValue, index } = this
      let chosenValue
      if (localType === 'checkbox') {
        chosenValue = localChosenValue.slice()
        if (checked) {
          chosenValue.push(localValue)
        } else {
          chosenValue.splice(
            (
              isNil(index)
                ? localChosenValue.indexOf(localValue)
                : findIndex(
                  chosenValue,
                  isFunction(index)
                    ? one => index(one) === index(localValue)
                    : one => one[index] === localValue[index]
                )
            ),
            1
          )
        }
      } else if (localType === 'agree') {
        chosenValue = checked
      } else {
        chosenValue = localValue
      }
      this.sendChosenValue(chosenValue)
    }
  },

  render() {
    const children = this.$slots.default
    const {
      _,
      block,
      nativeType,
      localShape,
      isChosen,
      disabled,
      handleChange
    } = this

    return (
      <label class={[_.choose, block && _.block]}>
        <input
          class={_.input}
          type={nativeType}
          domPropsChecked={isChosen}
          disabled={disabled}
          onChange={handleChange}
        />
        <div class={[_.holder, _[nativeType], _[localShape]]} />
        {children && (
          <div class={_.label}>
            {children}
          </div>
        )}
      </label>
    )
  }
})
</script>

<style lang="stylus" src="../_styles/components/Choose.module.styl" module />
