export function methodName(name) {
  return `on${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  return JSON.parse(localStorage.getItem(key))
}
