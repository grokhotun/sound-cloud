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

  /**
   * Геттер для получения node текущего элемента
   */
  get currentElement() {
    return this.$currentElement
  }

  /**
   * Метод вставляет html разметку в компонент
   * @param {string} html Принимает разметку в формате строки
   * @return {*} Возвращает контекст this или html разметку
   */
  html(html) {
    if (typeof html === 'string') {
      this.$currentElement.innerHTML = html
      return this
    }
    return this.$currentElement.outerHTML.trim()
  }

  /**
   * Метод аппендит node элемент к корневому элементу
   * @param {*} node Принимает DOM ноду
   */
  append(node) {
    if (node instanceof DOM) {
      node = node.$currentElement
    }
    this.$currentElement.append(node)
  }

  /**
   * Метод для подписки на события
   * @param {string} eventType Тип события
   * @param {function} callbackFunction Колбэк функция
   */
  on(eventType, callbackFunction) {
    this.$currentElement.addEventListener(eventType, callbackFunction)
  }

  /**
   * Метод для отписки от событиий
   * @param {string} eventType Тип события
   * @param {function} callbackFunction Колбек функция
   * @return {*} Контекст this
   */
  off(eventType, callbackFunction) {
    this.$currentElement.removeEventListener(eventType, callbackFunction)
    return this
  }

  /**
   * Метод геттер/сеттер для получения/задания значений атрибутов
   * @param {string} name Название атрибута
   * @param {*} value Значение
   * @return {*} Контекст this
   */
  attr(name, value) {
    if (value) {
      this.$currentElement.setAttribute(name, value)
      return this
    }
    return this.$currentElement.getAttribute(name)
  }

  /**
   * Метод для поиска родительских элементов по селектору
   * @param {string} selector Селектор
   * @return {*} Instance класса DOM
   */
  closest(selector) {
    return $(this.$currentElement.closest(selector))
  }

  /**
   * Метод для поиска дочерних элементов по селектору
   * @param {string} selector Селектор
   * @return {*} Instance класса DOM
   */
  find(selector) {
    return this.$currentElement.querySelector(selector)
  }

  /**
   * Метод для получения координат текущего элемента
   * @return {object} Объект координат
   */
  coords() {
    return this.$currentElement.getBoundingClientRect()
  }

  /**
   * Метод для задания стилей элементу
   * @param {object} styles Объект стилей
   * @return {*} Контекст this
   */
  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$currentElement.style[key] = styles[key]
    })
    return this
  }

  /**
   * Метод для получения value текущего элемента
   * @return {*} Instance класса DOM
   */
  value() {
    return this.$currentElement.value
  }
}

$.create = (tagName = 'div', className = '') => {
  const element = document.createElement(tagName)
  if (className) {
    element.classList.add(className)
  }
  return $(element)
}

export function $(selector) {
  return new DOM(selector)
}
