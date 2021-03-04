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
      return {
        ...state,
        play: action.payload
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

    case 'SET_UPLOAD_PROGRESS':
      const newArray = []
      const {idx, percentage} = action.payload
      const file = state.tracksForUpload[idx].file
      newArray[idx] = {
        file,
        uploadProgress: percentage
      }
      return {
        ...state,
        tracksForUpload: newArray
      }

    case 'SET_TRACK_LIST':
      return {
        ...state,
        trackList: action.payload
      }

    case 'SET_IS_FETCHING':
      return {
        ...state,
        isFetching: action.payload
      }

    case 'SET_CURRENT_TRACK_ID':
      return {
        ...state,
        currentTrackId: action.payload
      }

    default:
      return state
  }
}
