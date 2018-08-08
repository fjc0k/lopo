export default function normalizeData(data) {
  return data.map(item => {
    // e.g. ['10', 10]
    if (Array.isArray(item)) {
      const [label, value = label, children] = item
      return {
        label: label,
        value: value,
        children: Array.isArray(children) ? children.map(normalizeData) : undefined
      }
    }

    // e.g. { label: '10', value: 10 }
    if (typeof item === 'object') {
      if (Array.isArray(item.children)) {
        item.children = item.children.map(normalizeData)
      }
      return item
    }

    // e.g. '10'
    return {
      label: item,
      value: item
    }
  })
}
