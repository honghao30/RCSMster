let comlib = {
  isEmpty(value) {
    // 빈 값 체크
    if (value === undefined) {
      return true
    }
    if (typeof value === 'number') {
      if (value === 0) {
        return true
      }
    } else if (typeof value === 'string') {
      if (value === '' || value.length === 0) {
        return true
      }
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return true
        }
      } else if (!value) {
        return true
      } else {
        if (Object.keys(value).length === 0) {
          return true
        }
      }
    }
    return false
  }
}

export default comlib
