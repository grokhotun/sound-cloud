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
      const {idx, percentage} = action.payload
      const arrObject = state.tracksForUpload.map((item, index) => index === idx ? Object.assign({}, item, {uploadProgress: percentage}) : item)
      return {
        ...state,
        tracksForUpload: arrObject
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

    case 'SET_CURRENT_AUDIO_TIME_POSITION':
      return {
        ...state,
        currentAudioTimePosition: action.payload
      }

    case 'SET_CURRENT_AUDIO_HANDLE_POSITION':
      return {
        ...state,
        currentAudioHandlePosition: action.payload
      }

    case 'SET_SHUFFLED_TRACK_LIST':
      return {
        ...state,
        shuffledTrackList: action.payload
      }

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      }

    default:
      return state
  }
}
