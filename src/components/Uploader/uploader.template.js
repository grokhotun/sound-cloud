export function getUploader(state) {
  const template = tracksForUpload(state.tracksForUpload)
  return `
      <div class="uploader__buttons">
        <input id="file" multiple="true" accept=".mp3" type="file" class="uploader__input">
        <button data-action="open" class="uploader__btn">Открыть</button>
        <button data-action ="upload" class="uploader__btn">Загрузить на сервер</button>
      </div>
      ${template}
    `
}

function tracksForUpload(tracks) {
  if (tracks.length) {
    const listTemplate = tracks.map(track => `<li>${track}</li>`).join('')
    return `
      <ul class="uploader__files-list">
        ${listTemplate}
      </ul>
    `
  }
  return ''
}
