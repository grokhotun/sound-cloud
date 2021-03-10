import {BaseComponent} from '@/core/BaseComponent';

export class Footer extends BaseComponent {
  static className = 'footer'
  static rootElementType = 'footer'

  constructor($root, options) {
    super($root, {
      name: 'Footer',
      listeners: [],
      ...options
    })
  }

  renderComponent() {
    return `
      <a target="_blank" href="https://github.com/grokhotun/sound-cloud" class="footer__link">
        <i class="fab fa-github"></i>
      </a>
    `
  }
}
