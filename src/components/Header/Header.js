import {BaseComponent} from '@/core/BaseComponent';

export class Header extends BaseComponent {
  static className = 'header'

  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: []
    })
  }

  renderComponent() {
    return `
      <h1>SoundCloud</h1>
    `
  }
}
