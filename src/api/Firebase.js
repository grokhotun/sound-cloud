import firebase from 'firebase/app';
import 'firebase/storage'

export class FirebaseAPI {
  constructor(config = {}) {
    firebase.initializeApp(config)
    this.storage = firebase.storage()
  }
  get() {}
  put(file) {
    const ref = this.storage.ref(`music/${file.name}`)
    const task = ref.put(file)
    return task
  }
}
