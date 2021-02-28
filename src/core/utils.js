export function methodName(name) {
  return `on${name.charAt(0).toUpperCase()}${name.slice(1)}`
}
