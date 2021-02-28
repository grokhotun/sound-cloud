import {methodName} from '@/core/utils'

export class DomListener {
  constructor($root, listeners) {
    this.$root = $root
    this.listeners = listeners
  }

  /**
   * Метод создает метод для компонента на основе типа слушателя (click, input, change)
   * в формате on + название события
   */
  initListeners() {
    this.listeners.forEach(listener => {
      const method = methodName(listener)
      if (!this[method]) {
        throw new Error(`Метод ${method} не определен в компоненте ${this.name}`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  /**
   * Метод удаляет слушателей по имени метода компонента
   */
  removeListeners() {
    this.listeners.forEach(listener => {
      const method = methodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
