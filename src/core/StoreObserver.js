import {isSame} from '@/core/utils'

export class StoreObserver {
  constructor(store) {
    this.store = store
    this.subscribition = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.subscribition = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isSame(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.$storeHasChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }
  unsubscribeFromStore() {
    this.subscribition.unsubscribe()
  }
}
