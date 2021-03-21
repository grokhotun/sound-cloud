import {$} from '@/core/Dom'
import {getUploader} from '@/components/Uploader/uploader.template'
import {setCurrentTrackId, setIsFetching, setTrackList, updateTracksForUpload, setShuffledTrackList} from '@/redux/actions'
import {StateComponent} from '@/core/StateComponent'
import {setUploadProgress} from '@/redux/actions'
import {getTrackIdByHash, shuffler} from '@/core/utils'

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

  beforeInit() {
    this.useState({
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: ''
    })
  }

  async fetchData() {
    this.$dispatch(setIsFetching(true))
    const data = await this.api.getMusicList()
    if (data.length > 0) {
      this.$dispatch(setTrackList(data))
      const {trackList, currentTrackVolume, currentTrackId, currentAudioTimePosition, mute, play, repeat, shuffle} = this.$getState()
      if (shuffle) {
        this.$dispatch(setShuffledTrackList(shuffler(data)))
      } else {
        this.$dispatch(setShuffledTrackList(data))
      }
      const options = {
        currentTime: currentAudioTimePosition,
        volume: currentTrackVolume,
        muted: mute,
        loop: repeat,
        play: play
      }
      const $currentTrackId = getTrackIdByHash(trackList, currentTrackId)
      if ($currentTrackId !== -1) {
        this.$dispatch(setCurrentTrackId(currentTrackId))
        this.audio.init(trackList[$currentTrackId].url, options)
      } else {
        const $currentTrackHash = trackList[0].hashId
        this.$dispatch(setCurrentTrackId($currentTrackHash))
        this.audio.init(trackList[0].url, options)
      }
    }
    this.$dispatch(setIsFetching(false))
  }

  componentDidMount() {
    this.fetchData()
  }

  get template() {
    return getUploader(this.$getState(), this.state)
  }

  renderComponent() {
    return this.template
  }

  onChange(e) {
    let files = []
    this.setState({
      isError: false,
      isLoading: false,
      isSuccess: false,
      message: ''
    })

    files = Array.from(e.target.files)
    const isValid = files.filter(file => !file.type.match('audio')).length
    if (!isValid) {
      const newFiles = files.map(file => ({
        file,
        uploadProgress: 0
      }))
      this.$dispatch(updateTracksForUpload(newFiles))
    } else {
      this.setState({
        isError: true,
        message: 'Загружаемые файлы должны быть аудио файлы!'
      })
    }
  }

  async onClick(event) {
    const $target = $(event.target)
    const $parent = $target.closest('.uploader')
    if ($target.attr('data-action') === 'open') {
      $parent.find('input').click()
    } else if ($target.attr('data-action') === 'upload') {
      const {tracksForUpload} = this.$getState()
      if (!tracksForUpload.length) {
        this.setState({
          isError: true,
          message: 'Вы не выбрали ни одного трека для загрузки :('
        })
        return false
      }
      tracksForUpload.forEach((track, idx) => {
        this.setState({
          isLoading: true,
          message: 'Загружаю треки...'
        })
        const task = this.api.put(track.file)
        task.on('state-change',
            snapshot => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              this.$dispatch(setUploadProgress({idx, percentage}))
            },
            error => {
              console.log(`Some ${error} has occured`)
            },
            async () => {
              const {tracksForUpload} = this.$getState()
              const {name, size, md5Hash} = await task.snapshot.ref.getMetadata()
              const url = await task.snapshot.ref.getDownloadURL()
              const trackFinded = await this.api.findTrackByHashId(md5Hash)
              if (!trackFinded) {
                this.api.createCollectionRecord(md5Hash, name, url, size)
              }
              const isAllUploaded = tracksForUpload.every(({uploadProgress}) => uploadProgress === 100)
              if (isAllUploaded) {
                this.$dispatch(updateTracksForUpload([]))
                this.fetchData()
                this.setState({
                  isLoading: false,
                  isSuccess: true,
                  message: 'Все треки успешно загружены :)'
                })
              }
            }
        )
      })
    }
  }
}
