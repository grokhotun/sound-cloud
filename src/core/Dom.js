/**
 * Класс для работы с DOM деревом
 */
class DOM {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.$currentElement = document.querySelector(selector)
    } else {
      this.$currentElement = selector
    }
  }

  get currentElement() {
    return this.$currentElement
  }

  html(html) {
    if (typeof html === 'string') {
      this.$currentElement.innerHTML = html
      return this
    }
    return this.$currentElement.outerHTML.trim()
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$currentElement
    }
    this.$currentElement.append(node)
  }

  on(eventType, callbackFunction) {
    this.$currentElement.addEventListener(eventType, callbackFunction)
  }

  off(eventType, callbackFunction) {
    this.$currentElement.removeEventListener(eventType, callbackFunction)
  }

  attr(name, value) {
    if (value) {
      this.$currentElement.setAttribute(name, value)
      return this
    }
    return this.$currentElement.getAttribute(name)
  }

  closest(selector) {
    return $(this.$currentElement.closest(selector))
  }

  find(selector) {
    return this.$currentElement.querySelector(selector)
  }

  coords() {
    return this.$currentElement.getBoundingClientRect()
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$currentElement.style[key] = styles[key]
    })
    return this
  }
}

export function $(selector) {
  return new DOM(selector)
}

$.create = (tagName = 'div', className = '') => {
  const element = document.createElement(tagName)
  if (className) {
    element.classList.add(className)
  }
  return $(element)
}
