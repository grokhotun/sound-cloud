import {BaseComponent} from '@/core/BaseComponent';

export class Header extends BaseComponent {
  static className = 'header'
  renderComponent() {
    return `
      <h1>SoundCloud</h1>
    `
  }
}
