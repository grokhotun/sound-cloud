import {getTracklist} from '@/components/TrackList/tracklist.template';
import {$} from '@/core/Dom';
import {StateComponent} from '@/core/StateComponent';

export class TrackList extends StateComponent {
  static className = 'track-list'

  constructor($root, options) {
    super($root, {
      name: 'Player',
      listeners: ['click'],
      watch: ['trackList', 'isFetching'],
      ...options
    })
  }

  $storeHasChanged(changes) {
    console.log(changes)
    this.setState()
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
        console.log($trackItem.attr('data-id'))
      }
    }
  }
}
