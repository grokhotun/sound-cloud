import {$} from '@/core/Dom'

export class SoundCloud {
  constructor(selector, options = {}) {
    this.$rootElement = $(selector)
    this.components = options.components || []
  }

  init() {
    const $rootNode = $.create('div', 'soundcloud')

    this.components.forEach(Component => {
      const $componentNode = $.create('div', Component.className)
      const component = new Component()
      $componentNode.html(component.renderComponent())
      $rootNode.append($componentNode)
    })

    this.$rootElement.append($rootNode)
  }

  destroy() {}
}
