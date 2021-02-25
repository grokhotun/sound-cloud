import {BaseComponent} from '@/core/BaseComponent';

export class Header extends BaseComponent {
  renderComponent() {
    return `
      <div class="header">
        <h1>SoundCloud</h1>
      </div>
    `
  }
}
