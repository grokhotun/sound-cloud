export function getUploader(state) {
  const template = tracksForUpload(state.tracksForUpload)
  return `
      <div class="uploader__buttons">
        <input id="file" accept=".mp3,audio/* multiple="true" type="file" class="uploader__input">
        <button data-action="open" class="uploader__btn">Открыть</button>
        <button data-action ="upload" class="uploader__btn">Загрузить на сервер</button>
      </div>
      ${template}
    `
}

function tracksForUpload(tracks) {
  if (tracks.length) {
    const listTemplate = tracks.map((track, idx) => {
      return `
      <li class="list-item">
        <div class="list-item__info">${idx + 1} ${track.file.name}</div>
        <div class="list-item__progress">
          <div style="width: ${track.uploadProgress || 0}%" data-id="${idx}" class="progress-bar"></div>
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
