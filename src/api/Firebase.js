import firebase from 'firebase/app';
import 'firebase/storage'

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
      result.push({
        name: itemRef.name,
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
