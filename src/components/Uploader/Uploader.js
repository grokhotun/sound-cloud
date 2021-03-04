import {$} from '@/core/Dom';
import {getUploader} from '@/components/Uploader/uploader.template';
import {updateTracksForUpload} from '@/redux/actions'
import {StateComponent} from '@/core/StateComponent';

export class Uploader extends StateComponent {
  static className = 'uploader'

  constructor($root, options) {
    super($root, {
      name: 'Uploader',
      listeners: ['change', 'click'],
      watch: ['tracksForUpload'],
      ...options
    })
  }

  $storeHasChanged() {
    this.setState()
  }

  get template() {
    return getUploader(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  changeHandler() {

  }

  onChange(e) {
    const tracksName = []

    if (!e.target.files.length) {
      return
    }

    const files = Array.from(e.target.files)
    files.forEach(file => {
      if (!file.type.match('audio')) {
        console.log('Не музыка')
        return
      }
      console.log(`Трек: ${file.name}`)
      tracksName.push(file.name)
    })
    this.$dispatch(updateTracksForUpload(tracksName))
  }

  onClick(event) {
    const $target = $(event.target)
    const $parent = $target.closest('.uploader')
    if ($target.attr('data-action') === 'open') {
      $parent.find('input').click()
    }
  }
}
