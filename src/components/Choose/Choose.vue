<script>
import { isNil, isArray, isBoolean, isFunction, findIndex } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Choose',

  model: {
    prop: 'chosenValue',
    event: 'input'
  },

  props: {
    chosenValue: null,
    value: null,
    primaryKey: [String, Number, Function],
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
      const { localType, primaryKey, localChosenValue, localValue } = this
      return (
        localType === 'checkbox'
          ? (
            isNil(primaryKey)
              ? localChosenValue.indexOf(localValue) > -1
              : localChosenValue.some(
                isFunction(primaryKey)
                  ? one => primaryKey(one) === primaryKey(localValue)
                  : one => one[primaryKey] === localValue[primaryKey]
              )
          )
          : localType === 'radio'
            ? (
              isNil(primaryKey)
                ? localChosenValue === localValue
                : isFunction(primaryKey)
                  ? primaryKey(localChosenValue) === primaryKey(localValue)
                  : localChosenValue[primaryKey] === localValue[primaryKey]

            )
            : localChosenValue
      )
    }
  },

  methods: {
    handleChange({ target: { checked } }) {
      const { localType, localChosenValue, localValue, primaryKey } = this
      let chosenValue
      if (localType === 'checkbox') {
        chosenValue = localChosenValue.slice()
        if (checked) {
          chosenValue.push(localValue)
        } else {
          chosenValue.splice(
            (
              isNil(primaryKey)
                ? localChosenValue.indexOf(localValue)
                : findIndex(
                  chosenValue,
                  isFunction(primaryKey)
                    ? one => primaryKey(one) === primaryKey(localValue)
                    : one => one[primaryKey] === localValue[primaryKey]
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
      <label class={[_.choose, block && _.block, disabled && _.disabled]}>
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
