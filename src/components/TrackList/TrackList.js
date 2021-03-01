import {BaseComponent} from '@/core/BaseComponent';

export class TrackList extends BaseComponent {
  static className = 'track-list'

  constructor($root) {
    super($root, {
      name: 'Player',
      listeners: []
    })
  }

  renderComponent() {
    return `
        <li class="track-list__item">
          <div class="button">
            <i class="fas fa-play"></i>
          </div>
          <div class="track-list__number">1</div>
          <div class="track-list__name">Макс Корж - Свитер</div>
          <div class="track-list__size">9 МБ</div>
        </li>
        <li class="track-list__item">
          <div class="button">
            <i class="fas fa-play"></i>
          </div>
          <div class="track-list__number">2</div>
          <div class="track-list__name">Макс Корж - Свитер</div>
          <div class="track-list__size">9 МБ</div>
        </li>
        <li class="track-list__item">
          <div class="button">
            <i class="fas fa-play"></i>
          </div>
          <div class="track-list__number">3</div>
          <div class="track-list__name">Макс Корж - Свитер</div>
          <div class="track-list__size">9 МБ</div>
        </li>
        <li class="track-list__item">
          <div class="button">
            <i class="fas fa-play"></i>
          </div>
          <div class="track-list__number">4</div>
          <div class="track-list__name">Макс Корж - Свитер</div>
          <div class="track-list__size">9 МБ</div>
        </li>
    `
  }
}
