import {dragHandler, getHandleType} from '@/components/Player/player.functions';
import {getPlayer} from '@/components/Player/player.template';
import {$} from '@/core/Dom';
import {StateComponent} from '@/core/StateComponent';

export class Player extends StateComponent {
  static className = 'player'

  constructor($root) {
    super($root, {
      name: 'Player',
      listeners: ['mousedown', 'click']
    })
  }

  beforeInit() {
    const initialState = {
      play: false,
      shuffle: false,
      repeat: false
    }
    this.useState(initialState)
  }


  get template() {
    return getPlayer(this.state)
  }


  renderComponent() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    console.log($target)
    const $button = $target.closest('[data-type="button"]')
    if ($button && $button.attr('data-type') === 'button') {
      console.log($button.attr('data-action'))
      this.setState({
        play: true
      })
      console.log(this.state)
    }
  }

  onMousedown(event) {
    if (getHandleType(event) === 'track') {
      dragHandler(event, 'track-slider')
    } else if (getHandleType(event) === 'volume') {
      dragHandler(event, 'volume-slider')
    }
  }

  onMousemove(event) {
  }
}
