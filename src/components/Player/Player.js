import {$} from '@/core/Dom'
import {dragHandler, getHandleType} from '@/components/Player/player.functions'
import {getPlayer} from '@/components/Player/player.template'
import {StateComponent} from '@/core/StateComponent'
import {getTrackIdByHash, transformRange} from '@/core/utils'
import {togglePlay, toggleShuffle, toggleRepeat, toggleMute, setIsRewinding, updateCurrenttrackVolume, setCurrentTrackId, setCurrentAudioHandlePosition} from '@/redux/actions'
import {setCurrentAudioTimePosition} from '@/redux/actions';
export class Player extends StateComponent {
  static className = 'player'

  constructor($root, options) {
    super($root, {
      name: 'Player',
      listeners: ['mousedown', 'click', 'touchstart'],
      watch: ['play', 'mute', 'shuffle', 'repeat', 'currentAudioHandlePosition', 'currentTime', 'isEnded'],
      ...options
    })
  }

  beforeInit() {
    this.useState()
  }

  $storeHasChanged() {}

  $audioHasChanged({isEnded, currentTime}) {
    const {isRewinding} = this.$getState()
    const $slider = $(document.querySelector('[data-type="track-slider"]'))
    const maxSliderLength = $slider.coords().width
    if (!isRewinding && this.audio.getState.trackDuration) {
      const trackTime = transformRange(currentTime, {min: 0, max: this.audio.trackDuration}, {min: 0, max: maxSliderLength})
      this.$dispatch(setCurrentAudioHandlePosition(trackTime))
      this.$dispatch(setCurrentAudioTimePosition(currentTime))
    }
    if (isEnded) {
      this.switchTrack('next')
    }
  }

  get template() {
    return getPlayer(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  onClick(event) {
    if (this.$getState().isFetching) {
      return
    }
    const $target = $(event.target)
    const $button = $target.closest('[data-type="button"]')
    if ($button.currentElement) {
      const action = $button.attr('data-action')
      switch (action) {
        case 'play':
          this.audio.play()
          this.$dispatch(togglePlay(this.audio.getState.isPlaying))
          break

        case 'mute':
          this.audio.mute()
          this.$dispatch(toggleMute())
          break

        case 'shuffle':
          this.$dispatch(toggleShuffle())
          break

        case 'repeat':
          this.audio.repeat()
          this.$dispatch(toggleRepeat())
          break

        case 'next':
          this.switchTrack(action)
          break

        case 'prev':
          this.switchTrack(action)
          break

        default:
          break
      }
    }
  }

  async onMousedown(event) {
    this.$dispatch(setIsRewinding(true))
    if (getHandleType(event) === 'track') {
      const $slider = $(document.querySelector('[data-type="track-slider"]'))
      const rewindingTime = await dragHandler(event, 'track-slider')
      const trackTime = transformRange(rewindingTime, {min: 0, max: $slider.coords().width}, {min: 0, max: this.audio.trackDuration || 300})
      this.audio.rewind(trackTime)
    } else if (getHandleType(event) === 'volume') {
      const volumeValue = await dragHandler(event, 'volume-slider')
      const newVolumeValue = transformRange(volumeValue, {min: 0, max: 70}, {min: 0, max: 1}, false)
      this.audio.volume(newVolumeValue)
      this.$dispatch(updateCurrenttrackVolume(newVolumeValue))
    }
    this.$dispatch(setIsRewinding(false))
  }

  async onTouchstart(event) {
    this.$dispatch(setIsRewinding(true))
    if (getHandleType(event) === 'track') {
      const $slider = $(document.querySelector('[data-type="track-slider"]'))
      const rewindingTime = await dragHandler(event, 'track-slider')
      const trackTime = transformRange(rewindingTime, {min: 0, max: $slider.coords().width}, {min: 0, max: this.audio.trackDuration || 300})
      this.audio.rewind(trackTime)
    } else if (getHandleType(event) === 'volume') {
      const volumeValue = await dragHandler(event, 'volume-slider')
      const newVolumeValue = transformRange(volumeValue, {min: 0, max: 70}, {min: 0, max: 1}, false)
      this.audio.volume(newVolumeValue)
      this.$dispatch(updateCurrenttrackVolume(newVolumeValue))
    }
    this.$dispatch(setIsRewinding(false))
  }

  switchTrack(direction) {
    let newTrackId = 0
    let trackHash = ''
    const {trackList, currentTrackId, currentTrackVolume, currentAudioTimePosition, mute, repeat} = this.$getState()
    const $currentTrackId = getTrackIdByHash(trackList, currentTrackId)
    const options = {
      currentTime: currentAudioTimePosition,
      volume: currentTrackVolume,
      muted: mute,
      loop: repeat
    }
    if (direction === 'next') {
      if ($currentTrackId + 1 < trackList.length) {
        newTrackId = $currentTrackId + 1
        trackHash = trackList[newTrackId].hash
        this.$dispatch(setCurrentTrackId(trackHash))
        this.audio.init(trackList[newTrackId].url, options)
        this.audio.play()
        this.$dispatch(togglePlay(true))
      } else {
        return true
      }
    } else if (direction === 'prev') {
      if ($currentTrackId - 1 >= 0) {
        newTrackId = $currentTrackId - 1
        trackHash = trackList[newTrackId].hash
        this.$dispatch(setCurrentTrackId(trackHash))
        this.audio.init(trackList[newTrackId].url, options)
        this.audio.play()
        this.$dispatch(togglePlay(true))
      } else {
        return true
      }
    }
  }
}
