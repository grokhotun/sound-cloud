import {getLoader} from '@/components/Loader/Loader'
import {getButton} from '@/components/Player/player.template'

export function getTracklist(state) {
  const {trackList, isFetching, currentTrackId, play} = state
  if (isFetching) {
    return getLoader()
  }
  if (trackList.length) {
    const template = trackList.map((track, idx) => getTrack(track, idx, currentTrackId, play)).join('')
    return template
  }
  return 'Треков не найдено :('
}

function getTrack(track, idx, currentTrackId, isPlaying) {
  const playPauseButton = currentTrackId === idx && isPlaying ? getButton('pause', '', 'pause') : getButton('play', '', 'play')
  return `
    <li
      data-type="track-item"
      data-id="${idx}"
      class="track-list__item">
      ${playPauseButton}
      <div class="track-list__number">${idx + 1}</div>
      <div class="track-list__name">${track.name}</div>
      <div class="track-list__size">${track.size}</div>
    </li>

  `
}
