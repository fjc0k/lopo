import { normalizeData as _normalizeData } from '../_utils'

export default function normalizeData(data, cascaded) {
  if (!cascaded) {
    return data.map(groupData => _normalizeData(groupData))
  }
  return _normalizeData(data).map(groupData => {
    if (Array.isArray(groupData.children)) {
      groupData.children = _normalizeData(groupData.children, cascaded)
    } else {
      groupData.children = undefined
    }
    return groupData
  })
}
