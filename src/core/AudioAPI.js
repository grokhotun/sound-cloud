export class AudioAPI {
  constructor() {
    this.subscribers = []
    this.audio = new Audio()
  }

  get getState() {
    return JSON.parse(JSON.stringify({
      isPlaying: !this.audio.paused,
      isMuted: this.audio.muted,
      isLopped: this.audio.loop,
      isEnded: this.audio.ended,
      currentTime: Math.floor(this.audio.currentTime) || 0,
      currentVolume: this.audio.volume,
      readyState: this.audio.readyState,
      trackDuration: this.audio.duration || 0
    }))
  }

  get trackDuration() {
    return this.audio.duration
  }

  subscribe(func) {
    this.subscribers.push(func)
    return {
      unsubscribe() {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== func)
      }
    }
  }

  emit(state) {
    this.subscribers.forEach(subscriber => subscriber(state))
  }

  init(src, options) {
    this.audio.src = src
    this.audio.currentTime = 0
    this.audio.ontimeupdate = () => this.emit(this.getState)
    this.audio.onended = () => this.emit(this.getState)
    if (options) {
      this.audio.volume = options.volume
      this.audio.muted = options.muted
      this.audio.loop = options.loop
    }
  }

  play() {
    this.audio.paused ? this.audio.play() : this.audio.pause()
    this.emit(this.getState)
  }

  pause() {
    this.audio.pause()
    this.emit(this.getState)
  }

  rewind(time = 0) {
    this.audio.currentTime = time
    this.emit(this.getState)
  }

  volume(value = 1) {
    this.audio.volume = value
    this.emit(this.getState)
  }
  mute() {
    this.audio.muted ? this.audio.muted = false : this.audio.muted = true
    this.emit(this.getState)
  }

  repeat() {
    this.audio.loop ? this.audio.loop = false : this.audio.loop = true
    this.emit(this.getState)
  }
}
