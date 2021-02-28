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
