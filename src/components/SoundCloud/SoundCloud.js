import {$} from '@/core/Dom'

export class SoundCloud {
  constructor(selector, options = {}) {
    this.$rootElement = $(selector)
    this.components = options.components || []
  }

  /**
   * Метод инициализирует приложение, создает разметку,
   * вызывает метод init всех дочерних компонентов
   * @return {bool} Возвращает true
   */
  init() {
    const $rootNode = $.create('div', 'soundcloud')
    this.components = this.components.map(Component => {
      const $componentNode = $.create('div', Component.className)
      const component = new Component($componentNode)
      $componentNode.html(component.renderComponent())
      $rootNode.append($componentNode)
      return component
    })
    this.$rootElement.append($rootNode)
    this.components.forEach(component => component.init())
    return true
  }

  /**
   * Метод вызывает методы destroy всех дочерних компонентов
   * @return {bool} Возвращает true
   */
  destroy() {
    this.components.forEach(component => component.destroy())
    return true
  }
}
