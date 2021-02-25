export class SoundCloud {
  constructor(selector, options = {}) {
    this.$element = document.querySelector(selector)
    this.components = options.components || []
  }

  init() {}
  destory() {}
}
