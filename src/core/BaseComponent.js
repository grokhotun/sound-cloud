import {DomListener} from '@/core/DomListener'
export class BaseComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'DefaultName'
    this.store = options.store
    this.audio = options.audio
    this.api = options.api
    this.watch = options.watch || []
    this.beforeInit()
  }

  /**
   * Метод возвращает html разметку компонента. Должен быть обязательно определн
   */
  renderComponent() {
    throw new Error('Метод renderComponent() должен быть определен')
  }

  /**
   * Метод жизненного цикла
   */
  beforeInit() {}

  /**
   * Метод жизненного цикла
   */
  componentDidMount() {}

  init() {
    this.initListeners()
  }

  destroy() {
    this.removeListeners()
  }

  $storeHasChanged() {}

  $audioHasChanged() {}

  isWatching(key) {
    return this.watch.includes(key)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $getState() {
    return this.store.getState()
  }
}
