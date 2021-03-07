export const defaultState = {
  trackList: [],
  shuffledTrackList: [],
  play: false,
  mute: false,
  shuffle: false,
  repeat: false,
  currentTrackVolume: 1,
  currentTrackId: null,
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
  trackList: [],
  shuffledTrackList: []
})

export function normalizeInitialState(state) {
  return state ? normalizeState(state) : defaultState
}
