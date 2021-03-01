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
      mute: false,
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
    const $button = $target.closest('[data-type="button"]')
    let value
    if ($button.currentElement) {
      switch ($button.attr('data-action')) {
        case 'play':
        case 'pause':
          value = this.state.play
          this.setState({
            play: !value
          })
          break;

        case 'mute':
        case 'unmute':
          value = this.state.mute
          this.setState({
            mute: !value
          })
          break;

        case 'shuffle':
          value = this.state.shuffle
          this.setState({
            shuffle: !value
          })
          break;

        case 'repeat':
          value = this.state.repeat
          this.setState({
            repeat: !value
          })
          break;

        default:
          break;
      }
    }
  }

  onMousedown(event) {
    if (getHandleType(event) === 'track') {
      dragHandler(event, 'track-slider')
    } else if (getHandleType(event) === 'volume') {
      dragHandler(event, 'volume-slider')
    }
  }
}
