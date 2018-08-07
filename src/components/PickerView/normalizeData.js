import { normalizeData as _normalizeData } from '../_utils'

export default function normalizeData(data, cascaded) {
  if (!cascaded) {
    return data.map(groupData => _normalizeData(groupData))
  }
  return _normalizeData(data).map(groupData => {
    if (Array.isArray(groupData.children)) {
      groupData.children = normalizeData(groupData.children, cascaded)
    } else {
      delete groupData.children
    }
    return groupData
  })
}
