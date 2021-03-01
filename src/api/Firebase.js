import firebase from 'firebase'
import 'firebase/storage'

export class Firebase {
  constructor(config) {
    firebase.initilizeApp(config)
  }
  get() {}
  put() {}
}
