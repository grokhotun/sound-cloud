export function createStore(initialState = {}, rootReducer) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let subscribers = []

  return {
    subscribe(func) {
      subscribers.push(func)
      return {
        unsubscribe() {
          subscribers = subscribers.filter(subscriber => subscriber !== func)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(subscriber => subscriber(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}
