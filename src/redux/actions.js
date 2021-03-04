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

export function updateTracksForUpload(payload) {
  return {
    type: 'UPDATE_TRACKS_FOR_UPLOAD',
    payload
  }
}

export function uploadTracks() {
  return {
    type: 'UPLOAD_TRACKS'

  }
}

export function setUploadProgress(payload) {
  return {
    type: 'SET_UPLOAD_PROGRESS',
    payload
  }
}

export function setTrackList(payload) {
  return {
    type: 'SET_TRACK_LIST',
    payload
  }
}

export function setIsFetching(payload) {
  return {
    type: 'SET_IS_FETCHING',
    payload
  }
}
