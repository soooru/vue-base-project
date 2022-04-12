export const isNullOrUndefined = (param) => {
  if (param === null) return true
  if (typeof param === 'undefined') return true
  if (typeof param === 'string') {
    if (param === 'null' || param === 'undefined' || param === '') {
      return true
    } else {
      return false
    }
  } else if (typeof param === 'object') {
    if (Array.isArray(param)) {
      if (param.length === 0) {
        return true
      } else {
        return false
      }
    } else {
      if (Object.keys(param).length === 0) {
        return true
      } else {
        return false
      }
    }
  } else if (typeof param === 'number') {
    return false
  } else if (typeof param === 'boolean') {
    return false
  } else {
    return true
  }
}
