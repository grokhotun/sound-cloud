import {Header} from '@/components/Header/Header'
import {Footer} from '@/components/Footer/Footer'
import {Player} from '@/components/Player/Player'
import {SoundCloud} from '@/components/SoundCloud/SoundCloud'
import {TrackList} from '@/components/TrackList/TrackList'
import {Uploader} from '@/components/Uploader/Uploader'
import {createStore} from '@/core/createStore'
import {storage} from '@/core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {FirebaseAPI} from '@/api/Firebase'
import {AudioAPI} from '@/core/AudioAPI'
import {normalizeInitialState} from '@/redux/store'
import {firebaseConfig} from '@/firebase.config'
import {Searchbar} from '@/components/Searchbar/Searchbar'
import '@/scss/index.scss'


const store = createStore(normalizeInitialState(storage('sound-cloud')), rootReducer)
const audio = new AudioAPI()
const firebase = new FirebaseAPI(firebaseConfig)

store.subscribe(state => storage('sound-cloud', state))


const soundCloud = new SoundCloud('#root', {
  components: [Header, Player, Uploader, Searchbar, TrackList, Footer],
  store,
  audio,
  firebase
})

soundCloud.init()
