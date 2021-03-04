import {getTracklist} from '@/components/TrackList/tracklist.template'
import {$} from '@/core/Dom'
import {StateComponent} from '@/core/StateComponent'
import {setCurrentTrackId, togglePlay, updateCurrentTracktime} from '@/redux/actions'
import {transformRange} from '@/core/utils'

export class TrackList extends StateComponent {
  static className = 'track-list'

  constructor($root, options) {
    super($root, {
      name: 'Player',
      listeners: ['click'],
      watch: ['trackList', 'isFetching', 'play', 'currentTrackId'],
      ...options
    })
  }

  $storeHasChanged() {
  }

  get template() {
    return getTracklist(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    const $button = $target.closest('[data-type="button"]')
    const $trackItem = $target.closest('[data-type="track-item"]')
    if ($button.currentElement) {
      if ($button.attr('data-action') === 'play') {
        const {trackList, currentTrackId} = this.$getState()
        const id = +$trackItem.attr('data-id')
        if (!(currentTrackId === id)) {
          this.audio.init(trackList[id].url)
          this.audio.onTimeupdate(() => {
            const {isRewinding} = this.$getState()
            if (!isRewinding) {
              const trackTime = transformRange(this.audio.currentTime(), {min: 0, max: this.audio.trackDuration()}, {min: 0, max: 478})
              this.$dispatch(updateCurrentTracktime(trackTime))
            }
          })
          this.$dispatch(setCurrentTrackId(id))
          this.$dispatch(togglePlay(true))
        } else {
          this.audio.play()
          this.$dispatch(togglePlay(true))
        }
      } else if ($button.attr('data-action') === 'pause') {
        this.audio.pause()
        this.$dispatch(togglePlay(false))
      }
    }
  }
}
