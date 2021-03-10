import {getLoader} from '@/components/Loader/Loader'
import {getButton} from '@/components/Player/player.template'
import {querySearch} from '@/core/utils'

export function getTracklist(state) {
  const {shuffledTrackList, isFetching, currentTrackId, play, searchQuery} = state
  if (isFetching) {
    return getLoader()
  }
  if (shuffledTrackList.length) {
    const template = querySearch(shuffledTrackList, searchQuery).map((track, idx) => getTrack(track, idx, currentTrackId, play))
    if (template.length) {
      return template.join('')
    } else {
      return 'По вашему запросу ничего не найдено :('
    }
  } else {
    return 'Треков не найдено :('
  }
}

function getTrack(track, idx, currentTrackId, isPlaying) {
  const actionType = currentTrackId === track.hashId && isPlaying ? 'pause' : 'play'
  const playPauseButton = currentTrackId === track.hashId && isPlaying ? getButton(`${actionType}`, '', `${actionType}`) : getButton(`${actionType}`, '', `${actionType}`)
  return `
    <li
      data-action="${actionType}"
      data-type="track-item"
      data-id="${track.hashId}"
      class="track-list__item">
        ${playPauseButton}
      <div class="track-list__number">${idx + 1}</div>
      <div class="track-list__name">${track.name}</div>
      <div class="track-list__size">${track.size}</div>
    </li>

  `
}
