/**
 * Класс-обертка над стандартным классом Audio для удобства использования
 */
export class AudioAPI {
  constructor() {
    this.subscribers = []
    this.audio = new Audio()
  }

  /**
   * Гетер возвращает актуальное состояние Audio объекта
   */
  get getState() {
    return JSON.parse(JSON.stringify({
      isPlaying: !this.audio.paused,
      isMuted: this.audio.muted,
      isLopped: this.audio.loop,
      isEnded: this.audio.ended,
      currentTime: Math.floor(this.audio.currentTime) || 0,
      currentVolume: this.audio.volume,
      readyState: this.audio.readyState,
      trackDuration: this.audio.duration || 0
    }))
  }

  /**
   * Метод позволяет компонентам подписываться на Audio API
   * @param {function} func Принимает функцию callback
   * @return {function} Возвращает объект с функцию отписки
   */
  subscribe(func) {
    this.subscribers.push(func)
    return {
      unsubscribe() {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== func)
      }
    }
  }

  /**
   * Метод оповещает подписчиков о том, что state изменился
   * @param {object} state Принимает на вход текущий state объекта Audio
   */
  emit(state) {
    this.subscribers.forEach(subscriber => subscriber(state))
  }

  /**
   * Метод инициализирует объект audio
   * @param {sttring} src URL аудиозаписи
   * @param {*} options Объект опция для инициализации Audio
   */
  init(src, options) {
    this.audio.currentTime = options.currentTime || 0
    this.audio.volume = options.volume || 1
    this.audio.muted = options.muted || false
    this.audio.loop = options.loop || false
    this.audio.src = src
    this.audio.ontimeupdate = () => this.emit(this.getState)
    this.audio.onended = () => this.emit(this.getState)
  }

  /**
   * Метод тоглит теккущий объект audio (play/pause)
   */
  play() {
    this.audio.paused ? this.audio.play() : this.audio.pause()
    this.emit(this.getState)
  }

  /**
   * Метод служит для перематывания audio
   * @param {number} time Время в секундах
   */
  rewind(time = 0) {
    this.audio.currentTime = time
    this.emit(this.getState)
  }

  /**
   * Метод служит для задания громкости текущего объекта audio
   * @param {numbe} value Значение громкости (от 0 до 1)
   */
  volume(value = 1) {
    this.audio.volume = value
    this.emit(this.getState)
  }

  /**
   * Метод служит для mute текущего объекта audio
   */
  mute() {
    this.audio.muted ? this.audio.muted = false : this.audio.muted = true
    this.emit(this.getState)
  }

  /**
   * Метод служит для включения/выключения повтора текущего audio
   */
  repeat() {
    this.audio.loop ? this.audio.loop = false : this.audio.loop = true
    this.emit(this.getState)
  }
}
