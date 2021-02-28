import {dragHandler} from '@/components/Player/player.functions';
import {BaseComponent} from '@/core/BaseComponent';
import {$} from '@/core/Dom';

export class Player extends BaseComponent {
  static className = 'player'

  constructor($root) {
    super($root, {
      name: 'Player',
      listeners: ['click', 'mousedown', 'mousemove']
    })
  }

  renderComponent() {
    return `
        <div class="player__buttons">
          <div class="button">
            <i class="fas fa-backward"></i>
          </div>
          <div class="button">
            <i class="fas fa-play"></i>
          </div>
          <div class="button">
            <i class="fas fa-forward"></i>
          </div>
        </div>
        <div class="player__track-slider">
          <div data-type="track-slider" class="track-slider"></div>
          <div data-handle="track" class="track-handler"></div>
        </div>
        <div class="player__buttons">
          <div class="button">
            <i class="fas fa-volume-up"></i>
          </div>
          <div class="player__volume-slider">
            <div data-type="volume-slider" class="volume-slider"></div>
            <div data-handle="volume" class="volume-handler"></div>
          </div>
        </div>
        <div class="player__buttons">
          <div class="button">
            <i class="fas fa-random"></i>
          </div>
          <div class="button">
            <i class="fas fa-redo-alt"></i>
          </div>
        </div>
    `
  }

  onClick(event) {
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.attr('data-handle') === 'track') {
      dragHandler(event, 'track-slider')
    } else if ($target.attr('data-handle') === 'volume') {
      dragHandler(event, 'volume-slider')
    }
  }

  onMousemove(event) {
  }
}
