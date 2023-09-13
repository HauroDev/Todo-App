const shortMessage = (data = {}) =>
  Object.entries(data)
    .map(([property, value]) => `${property}: ${value.message}`)
    .join('\n')

export default shortMessage
