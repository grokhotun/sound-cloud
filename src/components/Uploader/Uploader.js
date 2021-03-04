import {$} from '@/core/Dom';
import {getUploader} from '@/components/Uploader/uploader.template';
import {setIsFetching, setTrackList, updateTracksForUpload} from '@/redux/actions'
import {StateComponent} from '@/core/StateComponent';
import {setUploadProgress} from '@/redux/actions'

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

  async fetchData() {
    this.$dispatch(setIsFetching(true))
    const data = await this.api.fetchData()
    this.$dispatch(setTrackList(data))
    setTimeout(() => {
      this.$dispatch(setIsFetching(false))
    }, 2000)
  }

  componentDidMount() {
    this.fetchData()
  }

  $storeHasChanged(changes) {
    console.log(changes)
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
    // const tracksName = []

    if (!e.target.files.length) {
      return
    }

    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      file,
      uploadProgress: 0
    }))
    files.forEach(file => {
      if (!file.type.match('audio')) {
        alert('Не музыка')
        return
      } else {
        this.$dispatch(updateTracksForUpload(newFiles))
      }
    })
  }

  onClick(event) {
    const $target = $(event.target)
    const $parent = $target.closest('.uploader')
    if ($target.attr('data-action') === 'open') {
      $parent.find('input').click()
    } else if ($target.attr('data-action') === 'upload') {
      const {tracksForUpload} = this.$getState()
      tracksForUpload.forEach((track, idx) => {
        const task = this.api.put(track.file)
        task.on('state-change', snapshot => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // document.querySelector(`[data-id="${idx}"`).style.width = `${percentage}px`
          this.$dispatch(setUploadProgress({idx, percentage}))
        }, error => {},
        async () => {
          document.querySelector(`[data-id="${idx}"`).style.backgroundColor = 'green';
          this.fetchData()
        })
      })
    }
  }
}
