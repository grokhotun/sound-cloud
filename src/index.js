import {Header} from '@/components/Header/Header'
import {Player} from '@/components/Player/Player'
import {SoundCloud} from '@/components/SoundCloud/SoundCloud'
import {TrackList} from '@/components/TrackList/TrackList';
import {createStore} from '@/core/createStore';
import {storage} from '@/core/utils';
import {rootReducer} from '@/redux/rootReducer';
// import firebase from 'firebase'
// import 'firebase/storage'

import '@/scss/index.scss'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDQIYGDohT6X5ckVKEwkOH91p_VLurr-04',
//   authDomain: 'sound-cloud-408fc.firebaseapp.com',
//   projectId: 'sound-cloud-408fc',
//   storageBucket: 'sound-cloud-408fc.appspot.com',
//   messagingSenderId: '360477666381',
//   appId: '1:360477666381:web:143ac502ef8a5b1b93c004'
// }

// document.querySelector('input').addEventListener('change', e => {
//   const currentFile = e.target.files[0]
//   const ref = storage.ref(`music/${currentFile.name}`)
//   const task = ref.put(currentFile)
//   task.on('state_change', snapshot => {
//     const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     console.log(`${percentage} %`)
//   }, error => {
//     console.log(`Some ${error} occured`)
//   }, () => {
//     console.log('Completed')
//     task.snapshot.ref.getDownloadURL().then(url => console.log(url))
//   })
// })

// document.querySelector('#get-data').addEventListener('click', e => {
//   storage.ref().child('music/').listAll().then(res => {
//     res.items.forEach(item => {
//       console.log(item.name)
//       item.getDownloadURL().then(url => console.log(url))
//     })
//   })
// })

// firebase.initializeApp(firebaseConfig)

// const storage = firebase.storage()

// console.log(storage)

const initialState = {
  repeat: false,
  shuffle: false
}

const store = createStore(initialState, rootReducer)

store.subscribe(state => {
  console.log(state)
  storage('sound-cloud', state)
})

const soundClound = new SoundCloud('#root', {
  components: [Header, Player, TrackList],
  store
})

soundClound.init()
