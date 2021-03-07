import {getLoader} from '@/components/Loader/Loader'
import {getButton} from '@/components/Player/player.template'

export function getTracklist(state) {
  const {shuffledTrackList, isFetching, currentTrackId, play} = state
  if (isFetching) {
    return getLoader()
  }
  if (shuffledTrackList.length) {
    const template = shuffledTrackList.map((track, idx) => getTrack(track, idx, currentTrackId, play)).join('')
    return template
  }
  return 'Треков не найдено :('
}

function getTrack(track, idx, currentTrackId, isPlaying) {
  const actionType = currentTrackId === track.hash && isPlaying ? 'pause' : 'play'
  const playPauseButton = currentTrackId === track.hash && isPlaying ? getButton(`${actionType}`, '', `${actionType}`) : getButton(`${actionType}`, '', `${actionType}`)
  return `
    <li
      data-action="${actionType}"
      data-type="track-item"
      data-id="${track.hash}"
      class="track-list__item">
        ${playPauseButton}
      <div class="track-list__number">${idx + 1}</div>
      <div class="track-list__name">${track.name}</div>
      <div class="track-list__size">${track.size}</div>
    </li>

  `
}
