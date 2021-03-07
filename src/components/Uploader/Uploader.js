import {$} from '@/core/Dom';
import {getUploader} from '@/components/Uploader/uploader.template';
import {setCurrentTrackId, setIsFetching, setTrackList, updateTracksForUpload, setShuffledTrackList} from '@/redux/actions'
import {StateComponent} from '@/core/StateComponent';
import {setUploadProgress} from '@/redux/actions'
import {getTrackIdByHash, shuffler} from '@/core/utils';

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
      if ($currentTrackId > 0) {
        this.$dispatch(setCurrentTrackId(currentTrackId))
        this.audio.init(trackList[$currentTrackId].url, options)
      } else {
        const $currentTrackHash = trackList[0].hash
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
    return getUploader(this.$getState())
  }

  renderComponent() {
    return this.template
  }

  onChange(e) {
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
          this.$dispatch(setUploadProgress({idx, percentage}))
        }, error => {
          console.log(`Some ${error} has occured`)
        },
        async () => {
          this.fetchData()
        })
      })
    }
  }
}
