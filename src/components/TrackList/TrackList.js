import {getTracklist} from '@/components/TrackList/tracklist.template'
import {$} from '@/core/Dom'
import {StateComponent} from '@/core/StateComponent'
import {getTrackIdByHash} from '@/core/utils'
import {setCurrentTrackId, togglePlay} from '@/redux/actions'

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
    const $trackItem = $target.closest('[data-type="track-item"]')
    if ($trackItem.currentElement) {
      if ($trackItem.attr('data-action') === 'play') {
        const {trackList, currentTrackId, currentTrackVolume} = this.$getState()
        const id = $trackItem.attr('data-id')
        if (!(currentTrackId === id)) {
          const nextTrackId = getTrackIdByHash(trackList, id)
          this.audio.init(trackList[nextTrackId].url, {volume: currentTrackVolume})
          this.$dispatch(setCurrentTrackId(id))
          this.$dispatch(togglePlay(true))
          this.audio.play()
        } else {
          this.audio.play()
          this.$dispatch(togglePlay(true))
        }
      } else if ($trackItem.attr('data-action') === 'pause') {
        this.audio.pause()
        this.$dispatch(togglePlay(false))
      }
    }
  }
}
