import {isSame} from '@/core/utils'
export class AudioObserver {
  constructor(audio) {
    this.audio = audio
    this.subscribition = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.audio.getState
    this.subscribition = this.audio.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isSame(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.$audioHasChanged(changes)
            }
          })
        }
      })
      this.prevState = this.audio.getState
    })
  }
  unsubscribeFromAudio() {
    this.subscribition.unsubscribe()
  }
}
