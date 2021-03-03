import {dragHandler, getHandleType} from '@/components/Player/player.functions';
import {getPlayer} from '@/components/Player/player.template';
import {$} from '@/core/Dom';
import {StateComponent} from '@/core/StateComponent';
import {transformRange} from '@/core/utils';
import {togglePlay, toggleShuffle, toggleRepeat, toggleMute, updateCurrentTracktime, setIsRewinding, updateCurrenttrackVolume} from '@/redux/actions';

export class Player extends StateComponent {
  static className = 'player'

  constructor($root, options) {
    super($root, {
      name: 'Player',
      listeners: ['mousedown', 'mouseup', 'click'],
      watch: ['play', 'mute', 'shuffle', 'repeat', 'currentTracktime'],
      ...options
    })
  }

  beforeInit() {
    const initialState = {
      play: false,
      mute: false,
      shuffle: false,
      repeat: false,
      currentTracktime: 0
    }
    this.useState(initialState)
    this.audio.onTimeupdate(() => {
      const {isRewinding} = this.$getState()
      if (!isRewinding) {
        const trackTime = transformRange(this.audio.currentTime(), {min: 0, max: this.audio.trackDuration()}, {min: 0, max: 478})
        this.$dispatch(updateCurrentTracktime(trackTime))
      }
    })
  }

  $storeHasChanged(changes) {
    this.setState(changes)
  }

  init() {
    super.init()
  }

  get template() {
    return getPlayer(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  onClick(event) {
    let isPaused
    const $target = $(event.target)
    const $button = $target.closest('[data-type="button"]')
    if ($button.currentElement) {
      switch ($button.attr('data-action')) {
        case 'play':
          isPaused = this.$getState().play
          if (!isPaused) {
            this.audio.play()
          } else {
            this.audio.pause()
          }
          this.$dispatch(togglePlay())
          break;

        case 'mute':
          this.$dispatch(toggleMute())
          break;

        case 'shuffle':
          this.$dispatch(toggleShuffle())
          break;

        case 'repeat':
          this.$dispatch(toggleRepeat())
          break;

        default:
          break;
      }
    }
  }

  onTouchstart(event) {
    let isPaused
    const $target = $(event.target)
    const $button = $target.closest('[data-type="button"]')
    if ($button.currentElement) {
      switch ($button.attr('data-action')) {
        case 'play':
          isPaused = this.$getState().play
          if (!isPaused) {
            this.audio.play()
          } else {
            this.audio.pause()
          }
          this.$dispatch(togglePlay())
          break;

        case 'mute':
          this.$dispatch(toggleMute())
          break;

        case 'shuffle':
          this.$dispatch(toggleShuffle())
          break;

        case 'repeat':
          this.$dispatch(toggleRepeat())
          break;

        default:
          break;
      }
    }
  }

  async onMousedown(event) {
    if (getHandleType(event) === 'track') {
      this.$dispatch(setIsRewinding(true))
      const rewindingTime = await dragHandler(event, 'track-slider')
      const trackTime = transformRange(rewindingTime, {min: 0, max: 478}, {min: 0, max: this.audio.trackDuration()})
      this.audio.rewind(trackTime)
      this.$dispatch(setIsRewinding(false))
    } else if (getHandleType(event) === 'volume') {
      this.$dispatch(setIsRewinding(true))
      const volumeValue = await dragHandler(event, 'volume-slider')
      const newVolumeValue = transformRange(volumeValue, {min: 0, max: 70}, {min: 0, max: 1}, false)
      this.audio.volume(newVolumeValue)
      this.$dispatch(updateCurrenttrackVolume(newVolumeValue))
      this.$dispatch(setIsRewinding(false))
    }
  }

  onMouseup() {

  }
}
