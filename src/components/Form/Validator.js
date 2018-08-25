/* eslint complexity: 0 no-await-in-loop: 0 */
import IDValidator from 'id-validator'
import isChinesePhoneNumber from 'is-chinese-phone-number'
import {
  isString,
  isArray,
  isInteger,
  isNil,
  isRegExp,
  isFunction,
  castArray
} from 'lodash'
import {
  isNumeric,
  isEmail,
  isUrl
} from '../_utils'

const idValidator = new IDValidator()

const typeValidators = {
  number: value => isNumeric(value),
  integer: value => isInteger(value),
  email: value => isEmail(value),
  url: value => isUrl(value),
  phone: value => isChinesePhoneNumber(value),
  mobile: value => isChinesePhoneNumber.mobile(value),
  landline: value => isChinesePhoneNumber.landline(value),
  id: value => idValidator.isValid(value)
}

export default class Validator {
  constructor(rules = {}) {
    this.rules = rules
  }

  setRules(rules) {
    this.rules = rules
  }

  async validateValue(model, key) {
    const { rules } = this
    let value = model[key]
    const rule = rules[key]
    const { required, type, min, max, len, trim, custom } = rule

    // trim?
    if (trim && isString(value)) value = value.trim()

    // required?
    if (isNil(value) || value === '') return !required

    // to string
    value = String(value)

    // type?
    if (type && !typeValidators[type](value)) return false

    // range?
    if (isNumeric(min) || isNumeric(max)) {
      const _value = (
        isNumeric(value) ? value
          : isArray(value) ? value.length
            : String(value).length
      )
      if (_value < min || _value > max) return false
    }

    // len?
    if (isNumeric(len)) {
      const _len = isArray(value) ? value.length : String(value).length
      if (len !== _len) return false
    }

    // custom?
    if (
      (isRegExp(custom) && !custom.test(value))
      || (isFunction(custom) && !await custom({ value, rule, model, rules }))
    ) {
      return false
    }

    return true
  }

  async validate(model) {
    const keys = Object.keys(model)
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i]
      const rules = castArray(this.rules[key])
      for (let i2 = 0, len2 = rules.length; i2 < len2; i2++) {
        const rule = rules[i2]
        const valid = await this.validateValue(model, key)
        if (!valid) {
          return {
            valid: false,
            prop: key,
            message: rule.message
          }
        }
      }
    }
    return { valid: true }
  }
}
