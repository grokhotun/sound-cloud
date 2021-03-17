import {$} from '@/core/Dom'
import {StateComponent} from '@/core/StateComponent'
import {getTrackIdByHash} from '@/core/utils'
import {getTracklist} from '@/components/TrackList/tracklist.template'
import {setCurrentTrackId, togglePlay, setCurrentAudioHandlePosition} from '@/redux/actions'

export class TrackList extends StateComponent {
  static className = 'track-list'

  constructor($root, options) {
    super($root, {
      name: 'Player',
      listeners: ['click'],
      watch: ['shuffledTrackList', 'isFetching', 'play', 'currentTrackId', 'searchQuery'],
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
    const $trackItem = $target.closest('[data-type="track-item"]')
    if ($trackItem.currentElement) {
      if ($trackItem.attr('data-action') === 'play') {
        const {trackList, currentTrackId, currentTrackVolume, mute, repeat} = this.$getState()
        const options = {
          volume: currentTrackVolume,
          muted: mute,
          loop: repeat
        }
        const id = $trackItem.attr('data-id')
        if (!(currentTrackId === id)) {
          this.$dispatch(setCurrentAudioHandlePosition(0))
          const nextTrackId = getTrackIdByHash(trackList, id)
          this.audio.init(trackList[nextTrackId].url, options)
          this.$dispatch(setCurrentTrackId(id))
          this.$dispatch(togglePlay(true))
          this.audio.play()
        } else {
          this.audio.play()
          this.$dispatch(togglePlay(true))
        }
      } else if ($trackItem.attr('data-action') === 'pause') {
        this.audio.play()
        this.$dispatch(togglePlay(false))
      }
    }
  }
}
