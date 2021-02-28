import {DomListener} from '@/core/DomListener';

export class BaseComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'DefaultName'
  }

  /**
   * Метод возвращает html разметку компонента. Должен быть обязательно определн
   */
  renderComponent() {
    throw new Error('Метод renderComponent() должен быть определен')
  }

  init() {
    this.initListeners()
  }

  destroy() {
    this.removeListeners()
  }
}
