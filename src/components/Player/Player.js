import {BaseComponent} from '@/core/BaseComponent';

export class Player extends BaseComponent {
  static className = 'player'

  constructor($root) {
    super($root, {
      name: 'Player',
      listeners: ['click']
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
          <div class="track-slider"></div>
          <div class="track-handler"></div>
        </div>
        <div class="player__buttons">
          <div class="button">
            <i class="fas fa-volume-up"></i>
          </div>
          <div class="player__volume-slider">
            <div class="volume-slider"></div>
            <div class="volume-handler"></div>
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
    const $root = this.$root
    console.log($root)
  }
}
