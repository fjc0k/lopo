const _ = require('lodash')
const http = require('axios')
const fs = require('fs-extra')
const path = require('path')

const resolveSrc = path.resolve.bind(path, __dirname, '../src')

const divisionDataUrl = 'https://division-data.alicdn.com/simple/addr_4_1111_1_0.js'

const removeEmpty = arr => arr.filter(item => item && String(item).length)

;(async () => {
  const { data } = await http.get(divisionDataUrl)
  const listStr = data.match(/tdist=(.+?);/)[1].trim()
  const listObj = eval(`true, ${listStr}`) // eslint-disable-line no-eval
  const listArr = _.reduce(listObj, (arr, item, code) => {
    if (item[0] !== '其它区') {
      item.push(code)
      arr.push(item)
    }
    return arr
  }, [])
  const divisionList = listArr.filter(item => +item[1] === 1)
    .map(item => {
      return removeEmpty([
        item[0],
        listArr.filter(item2 => +item2[1] === +_.last(item)).map(item2 => {
          return removeEmpty([
            item2[0],
            listArr.filter(item3 => +item3[1] === +_.last(item2)).map(item3 => {
              return item3[0]
            })
          ])
        })
      ])
    })
  fs.outputJsonSync(resolveSrc('data.json'), divisionList, { spaces: 2 })
})()
