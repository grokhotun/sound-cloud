import firebase from 'firebase/app';
import 'firebase/storage'
import {formatBytes} from '@/core/utils'
export class FirebaseAPI {
  constructor(config = {}) {
    firebase.initializeApp(config)
    this.storage = firebase.storage()
  }

  async fetchData() {
    const result = []
    const folder = this.storage.ref().child('music')
    const {items} = await folder.listAll()
    for (const itemRef of items) {
      const url = await itemRef.getDownloadURL()
      const meta = await itemRef.getMetadata()
      result.push({
        name: itemRef.name.replace('.mp3', ''),
        size: formatBytes(meta.size),
        hash: meta.md5Hash,
        url
      })
    }
    return result
  }

  put(file) {
    const ref = this.storage.ref(`music/${file.name}`)
    const task = ref.put(file)
    return task
  }
}
