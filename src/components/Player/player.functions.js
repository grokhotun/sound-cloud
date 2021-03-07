import {$} from '@/core/Dom'

export function dragHandler(event, sliderType) {
  return new Promise(resolve => {
    const $target = $(event.target)
    const $slider = $(document.querySelector(`[data-type="${sliderType}"]`))
    const sliderCoords = $slider.coords()
    let delta = event.type === 'mousedown' ? event.pageX - sliderCoords.left : event.touches[0].clientX - sliderCoords.left
    delta = normalizeDelta(delta, sliderCoords)

    document.onmousemove = e => {
      delta = normalizeDelta(e.pageX - sliderCoords.left, sliderCoords)
      $target.css({
        left: `${delta}px`
      })
    }

    document.ontouchmove = e => {
      delta = normalizeDelta(e.touches[0].clientX - sliderCoords.left, sliderCoords)
      $target.css({
        left: `${delta}px`
      })
    }

    document.onmouseup = () => {
      document.onmousemove = null
      resolve(delta)
    }

    document.ontouchend = () => {
      document.ontouchstart = null
      resolve(delta)
    }
  })
}

export function getHandleType(event) {
  if ($(event.target).attr('data-handle') === 'track') {
    return 'track'
  } else if ($(event.target).attr('data-handle') === 'volume') {
    return 'volume'
  } else {
    return ''
  }
}

function normalizeDelta(value, sliderCoords) {
  let delta = value
  if (delta > sliderCoords.width) {
    delta = sliderCoords.width
  } else if (delta < 0) {
    delta = 0
  }
  return delta
}
