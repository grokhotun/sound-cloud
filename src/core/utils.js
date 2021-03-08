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

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getTrackIdByHash(trackList, trackHash) {
  return trackList.map(track => track.hashId).indexOf(trackHash)
}

export function shuffler(array) {
  const newArray = [...array]
  let currentIndex = newArray.length
  let temporaryValue
  let randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = newArray[currentIndex]
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }
  return newArray
}
