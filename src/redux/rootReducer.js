export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case 'TOGGLE_SHUFFLE':
      prevState = state.shuffle
      return {
        ...state,
        shuffle: !prevState
      }

    case 'TOGGLE_PLAY':
      prevState = state.play
      return {
        ...state,
        play: !prevState
      }

    case 'TOGGLE_MUTE':
      prevState = state.mute
      return {
        ...state,
        mute: !prevState
      }

    case 'TOGGLE_REPEAT':
      prevState = state.repeat
      return {
        ...state,
        repeat: !prevState
      }

    case 'UPDATE_CURRENT_TRACKTIME':
      return {
        ...state,
        currentTracktime: action.payload
      }

    case 'UPDATE_CURRENT_TRACKVOLUME':
      return {
        ...state,
        currentTrackVolume: action.payload
      }

    case 'SET_IS_REWINDING':
      return {
        ...state,
        isRewinding: action.payload
      }

    case 'UPDATE_TRACKS_FOR_UPLOAD':
      return {
        ...state,
        tracksForUpload: action.payload
      }

    default:
      return state
  }
}
