export function toggleShuffle() {
  return {
    type: 'TOGGLE_SHUFFLE'
  }
}

export function togglePlay() {
  return {
    type: 'TOGGLE_PLAY'
  }
}

export function toggleMute() {
  return {
    type: 'TOGGLE_MUTE'
  }
}

export function toggleRepeat() {
  return {
    type: 'TOGGLE_REPEAT'
  }
}

export function updateCurrentTracktime(payload) {
  return {
    type: 'UPDATE_CURRENT_TRACKTIME',
    payload
  }
}

export function setIsRewinding(payload) {
  return {
    type: 'SET_IS_REWINDING',
    payload
  }
}

export function updateCurrenttrackVolume(payload) {
  return {
    type: 'UPDATE_CURRENT_TRACKVOLUME',
    payload
  }
}
