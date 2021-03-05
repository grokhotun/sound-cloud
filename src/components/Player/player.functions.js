import {$} from '@/core/Dom'

export function dragHandler(event, sliderType, audio) {
  return new Promise(resolve => {
    const $target = $(event.target)
    const $slider = $(document.querySelector(`[data-type="${sliderType}"]`))
    const sliderCoords = $slider.coords()
    let delta = event.pageX - sliderCoords.left

    delta = checkDelta(delta, sliderCoords)

    document.onmousemove = e => {
      delta = checkDelta(e.pageX - sliderCoords.left, sliderCoords)
      $target.css({
        left: `${delta}px`
      })
    }

    document.onmouseup = () => {
      document.onmousemove = null
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

function checkDelta(value, sliderCoords) {
  let delta = value
  if (delta > sliderCoords.width) {
    delta = sliderCoords.width
  } else if (delta < 0) {
    delta = 0
  }
  return delta
}
