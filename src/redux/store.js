export const defaultState = {
  trackList: [],
  play: false,
  mute: false,
  shuffle: false,
  repeat: false,
  currentTrackVolume: 1,
  currentTrackId: 0,
  isRewinding: false,
  tracksForUpload: [],
  isFetching: true,
  currentAudioTimePosition: 0,
  currentAudioHandlePosition: 0
}

const normalizeState = state => ({
  ...state,
  play: false,
  isFetching: true,
  isRewinding: false,
  tracksForUpload: [],
  trackList: []
})

export function normalizeInitialState(state) {
  return state ? normalizeState(state) : defaultState
}
