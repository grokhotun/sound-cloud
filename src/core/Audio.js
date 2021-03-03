export function createAudioAPI(src = '') {
  const audio = new Audio(src)
  return {
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
