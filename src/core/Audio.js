export function createAudioAPI(src = '') {
  let audio = new Audio(src)
  return {
    init(source = '') {
      audio.pause()
      audio = new Audio(source)
      audio.play()
    },
    play() {
      audio.play()
    },
    pause() {
      audio.pause()
    },
    rewind(time) {
      audio.currentTime = time
    },
    volume(value) {
      audio.volume = value
    },
    mute() {},
    nextTrack() {},
    prevTrack() {},
    currentTime() {
      return Math.floor(audio.currentTime)
    },
    trackDuration() {
      return Math.floor(audio.duration)
    },
    onTimeupdate(callback) {
      audio.ontimeupdate = callback
    }
  }
}
