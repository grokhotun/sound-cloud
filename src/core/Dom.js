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
