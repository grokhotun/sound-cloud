export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case 'TOGGLE_SHUFFLE':
      prevState = state.shuffle
      console.log(prevState)
      return {
        ...state,
        shuffle: !prevState
      }

    default:
      return state
  }
}
