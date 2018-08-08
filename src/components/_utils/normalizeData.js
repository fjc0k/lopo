export default data => {
  // e.g. '10'
  if (Array.isArray(data)) {
    return [{
      label: data,
      value: data
    }]
  }

  return data.map(item => {
    // e.g. { label: '10', value: 10 }
    if (typeof item === 'object') return item

    // e.g. ['10', 10]
    if (Array.isArray(item)) {
      const [label, value = label, children] = item
      return {
        label: label,
        value: value,
        children
      }
    }

    // e.g. '10'
    return {
      label: item,
      value: item
    }
  })
}
