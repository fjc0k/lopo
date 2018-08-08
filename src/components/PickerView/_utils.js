/* eslint guard-for-in: 0 max-params: 0 */
import { findIndex, isArray, isPlainObject } from 'lodash'

export function normalizeData(rawData) {
  const normalizedData = rawData.map(groupData => {
    return groupData.map(item => {
      // e.g. ['10', 10]
      if (isArray(item)) {
        const [label, value = label, children] = item
        return {
          label: label,
          value: value,
          children: isArray(children) ? normalizeData(children) : undefined
        }
      }

      // e.g. { label: '10', value: 10 }
      if (isPlainObject(item)) {
        if (isArray(item.children)) {
          item.children = normalizeData(item.children)
        }
        return item
      }

      // e.g. '10'
      return {
        label: item,
        value: item
      }
    })
  })
  return normalizedData
}

export function groupData(
  normalizedData, // 标准化后的数据
  selectedValues, // 初始选中值
  result = {
    groupedData: [], // 分组后的数据
    parentIndexes: [], // groupedData 各组所属的父组索引，-1 表示根
    selectedIndexes: [], // 同时算出初始选中值的索引
    _index: 0 // selectedValues 的辅助索引
  },
  parentIndex = -1 // 生成 parentIndexes 的辅助索引
) {
  for (const _groupIndex in normalizedData) {
    const _groupData = normalizedData[_groupIndex]
    const _foundIndex = findIndex(_groupData, ['value', selectedValues[result._index++]])
    const foundIndex = _foundIndex === -1 ? 0 : _foundIndex
    const foundItem = _groupData[foundIndex]
    result.groupedData.push(_groupData)
    result.selectedIndexes.push(foundIndex)
    result.parentIndexes.push(parentIndex)
    if (foundItem && foundItem.children) {
      groupData(foundItem.children, selectedValues, result, result._index - 1)
    }
  }
  return result
}
