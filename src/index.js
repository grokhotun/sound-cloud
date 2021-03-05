import {Header} from '@/components/Header/Header'
import {Player} from '@/components/Player/Player'
import {SoundCloud} from '@/components/SoundCloud/SoundCloud'
import {TrackList} from '@/components/TrackList/TrackList';
import {Uploader} from '@/components/Uploader/Uploader';
import {createStore} from '@/core/createStore';
import {storage} from '@/core/utils';
import {rootReducer} from '@/redux/rootReducer';
import {defaultStore} from '@/redux/defaultStore';
import {FirebaseAPI} from '@/api/Firebase';
import {AudioAPI} from '@/core/AudioAPI';
import '@/scss/index.scss'

const firebaseConfig = {
  apiKey: 'AIzaSyDQIYGDohT6X5ckVKEwkOH91p_VLurr-04',
  authDomain: 'sound-cloud-408fc.firebaseapp.com',
  projectId: 'sound-cloud-408fc',
  storageBucket: 'sound-cloud-408fc.appspot.com',
  messagingSenderId: '360477666381',
  appId: '1:360477666381:web:143ac502ef8a5b1b93c004'
}

const store = createStore(defaultStore, rootReducer)
const audio = new AudioAPI()
const firebase = new FirebaseAPI(firebaseConfig)

store.subscribe(state => {
  console.log('ActualStore', state)
  storage('sound-cloud', state)
})

const soundClound = new SoundCloud('#root', {
  components: [Header, Player, Uploader, TrackList],
  store,
  audio,
  firebase
})

soundClound.init()
