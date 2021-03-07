import {transformRange} from '@/core/utils'

export function getButton(type = 'play', classes = '', action = '') {
  return `
    <div
      data-type="button"
      data-action="${action}"
      class="button ${classes}">
        <i class="fas fa-${type}"></i>
    </div>
  `
}


export function getPlayer(state) {
  const playPauseButton = state.play ? getButton('pause', '', 'play') : getButton('play', '', 'play')
  const randomButton = state.shuffle ? getButton('random', 'button--random active', 'shuffle') : getButton('random', 'button--random', 'shuffle')
  const repeatButton = state.repeat ? getButton('redo-alt', 'button--repeat active', 'repeat') : getButton('redo-alt', 'button--repeat', 'repeat')
  const muteUnmuteButton = state.mute ? getButton('volume-mute', '', 'mute') : getButton('volume-up', '', 'mute')
  const volume = transformRange(state.currentTrackVolume, {min: 0, max: 1}, {min: 0, max: 70}, false)
  const currentTrackVolume = `${volume}px`
  const currentAudioHandlePosition = `${state.currentAudioHandlePosition}px`
  return `
    <div class="player__col player__col--first">
      <div class="player__buttons">
      ${getButton('backward', '', 'prev')}
      ${playPauseButton}
      ${getButton('forward', '', 'next')}
    </div>
    <div class="player__track-slider">
      <div data-type="track-slider" class="track-slider"></div>
      <div style="left: ${currentAudioHandlePosition}" data-handle="track" class="track-handler"></div>
    </div>
    </div>
    <div class="player__col player__col--second">
      <div class="player__buttons">
      ${muteUnmuteButton}
      <div class="player__volume-slider">
        <div data-type="volume-slider" class="volume-slider"></div>
        <div style="left: ${currentTrackVolume}" data-handle="volume" class="volume-handler"></div>
      </div>
    </div>
    <div class="player__buttons">
      ${randomButton}
      ${repeatButton}
    </div>
    </div>
  `
}
