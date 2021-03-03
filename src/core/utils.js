export function methodName(name) {
  return `on${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  return JSON.parse(localStorage.getItem(key))
}

export function isSame(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function transformRange(value, sourceRange, targetRange = {max: 100, min: 0}, shouldFloor = true) {
  const scale = (targetRange.max - targetRange.min) / (sourceRange.max - sourceRange.min)
  return shouldFloor ? Math.floor((value - sourceRange.min) * scale) : rounded((value - sourceRange.min) * scale)
}

export function rounded(number) {
  return +number.toFixed(2)
}
