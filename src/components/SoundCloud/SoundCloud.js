import {AudioObserver} from '@/core/AudioObserver'
import {$} from '@/core/Dom'
import {StoreObserver} from '@/core/StoreObserver'

export class SoundCloud {
  constructor(selector, options = {}) {
    this.$rootElement = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.audio = options.audio
    this.storeObserver= new StoreObserver(this.store)
    this.audioObserver = new AudioObserver(this.audio)
    this.api = options.firebase
  }

  /**
   * Метод инициализирует приложение, создает разметку,
   * вызывает метод init всех дочерних компонентов
   * @return {bool} Возвращает true
   */
  init() {
    const $rootNode = $.create('div', 'soundcloud')
    const componentOptions = {
      store: this.store,
      audio: this.audio,
      api: this.api
    }
    this.components = this.components.map(Component => {
      const $componentNode = $.create('div', Component.className)
      const component = new Component($componentNode, componentOptions)
      $componentNode.html(component.renderComponent())
      $rootNode.append($componentNode)
      return component
    })
    this.$rootElement.append($rootNode)
    this.storeObserver.subscribeComponents(this.components)
    this.audioObserver.subscribeComponents(this.components)
    this.components.forEach(component => {
      component.init()
      component.componentDidMount()
    })
    return true
  }

  /**
   * Метод вызывает методы destroy всех дочерних компонентов
   * @return {bool} Возвращает true
   */
  destroy() {
    this.storeObserver.unsubscribeFromStore()
    this.audioObserver.unsubscribeFromAudio()
    this.components.forEach(component => component.destroy())
    return true
  }
}
