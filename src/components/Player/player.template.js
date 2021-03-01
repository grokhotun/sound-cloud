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
  const playPauseButton = state.play ? getButton('pause', '', 'pause') : getButton('play', '', 'play')
  const randomButton = state.shuffle ? getButton('random', 'button--random active', 'shuffle') : getButton('random', 'button--random', 'shuffle')
  const repeatButton = state.repeat ? getButton('redo-alt', 'button--repeat active', 'repeat') : getButton('redo-alt', 'button--repeat', 'repeat')
  const muteUnmuteButton = state.mute ? getButton('volume-mute', '', 'unmute') : getButton('volume-up', '', 'mute')
  return `
    <div class="player__buttons">
      ${getButton('backward', '', 'prev')}
      ${playPauseButton}
      ${getButton('forward', '', 'next')}
    </div>
    <div class="player__track-slider">
      <div data-type="track-slider" class="track-slider"></div>
      <div data-handle="track" class="track-handler"></div>
    </div>
    <div class="player__buttons">
      ${muteUnmuteButton}
      <div class="player__volume-slider">
        <div data-type="volume-slider" class="volume-slider"></div>
        <div data-handle="volume" class="volume-handler"></div>
      </div>
    </div>
    <div class="player__buttons">
      ${randomButton}
      ${repeatButton}
    </div>
  `
}
