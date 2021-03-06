export function getUploader(state, {isError, isSuccess, message, isLoading}) {
  const template = tracksForUpload(state.tracksForUpload)
  return `
      <div class="uploader__buttons">
        <input id="file" accept=".mp3,audio/*" multiple="true" type="file" class="uploader__input">
        <button ${isLoading ? 'disabled' : ''} data-action="open" class="uploader__btn">Открыть</button>
        <button ${isLoading ? 'disabled' : ''} data-action ="upload" class="uploader__btn">Загрузить на сервер</button>
      </div>
      <div class="uploader__messages">
        ${isError
          ? `<div class="message message--error"><i class="fas fa-exclamation-circle"></i><p>${message}</p></div>`
          : ''}
        ${isSuccess
          ? `<div class="message message--success"><i class="fas fa-check-circle"></i><p>${message}</p></div>`
          : ''}
        ${isLoading
          ? `<div class="message message--warning"><i class="fas fa-spinner"></i><p>${message}</p></div>`
          : ''}
      </div>
      ${template}
    `
}

function tracksForUpload(tracks) {
  if (tracks.length) {
    const listTemplate = tracks.map((track, idx) => {
      const backgroundStyle = track.uploadProgress === 100 ? 'background-color: green;' : ''
      return `
      <li class="list-item">
        <div class="list-item__info">${idx + 1} ${track.file.name}</div>
        <div class="list-item__progress">
          <div style="${backgroundStyle} width: ${track.uploadProgress || 0}%" data-id="${idx}" class="progress-bar"></div>
        </div>
      </li>`
    })
    return `
      <ul class="uploader__files-list">
        ${listTemplate.join('')}
      </ul>
    `
  }
  return ''
}
