import { intersection, values } from 'lodash'
import _ from '../components/_styles/components/Hairline.module.styl'

const hairlineClassList = values(_)

const noHairlineSidesList = {
  a: [],
  t: ['r', 'b', 'l'],
  r: ['t', 'b', 'l'],
  b: ['t', 'r', 'l'],
  l: ['t', 'r', 'b'],
  x: ['t', 'b'],
  y: ['r', 'l']
}

export default {
  bind(el, { value, modifiers }) {
    el.classList.remove(...hairlineClassList)
    const noHairlineSides = intersection(
      ...Object
        .keys(modifiers)
        .reduce((modifiers, modifier) => {
          modifiers.push(...modifier.split(''))
          return modifiers
        }, [])
        .map(modifier => {
          return noHairlineSidesList[modifier]
        })
        .filter(v => !!v)
    )
    if (value === false) {
      noHairlineSides.push('a')
    }
    el.classList.add(
      _.hairline,
      ...noHairlineSides.map(side => _[`no${side.toUpperCase()}`])
    )
  },
  update(el, { value }) {
    el.classList[value === false ? 'add' : 'remove'](_.noA)
  }
}
