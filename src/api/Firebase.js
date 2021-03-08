import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

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

  auth(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user
          const user = userCredential.user
          console.log(user)
          // ...
        })
        .catch((error) => {
          console.log(error)
        })
  }

  /**
   * Возвращает список всех доступных пользователей
   */
  async getAllUsers() {
    try {
      const response = await firebase
          .firestore()
          .collection('users')
          .get()

      const data = response.docs.map(track => ({...track.data()}))
      console.log('All Users', data)
      return data
    } catch (error) {
      console.log(`Some error ${error} has occured in getMusicList()`)
    }
  }

  /**
   * Возвращает список всех доступных треков
   * @return {array} Возвращает массив объектов
   */
  async getMusicList() {
    try {
      const response = await firebase
          .firestore()
          .collection('music')
          .get()

      const data = response.docs.map(track => ({...track.data()}))

      return data
    } catch (error) {
      console.error(`Ошибка в методе getMusicList()\n\n${error.message}`)
      return false
    }
  }

  /**
   * Создает запись в коллекции music на основе загружаемых файлов
   * @param {hashId} hashId Уникальный hashId записи
   * @param {name} name Имя трека
   * @param {url} url Ссылка для скачивания
   * @param {size} size Размер трека
   */
  async createCollectionRecord(hashId, name, url, size) {
    try {
      await firebase
          .firestore()
          .collection('music')
          .add({
            name,
            url,
            size: formatBytes(size),
            hashId
          })
    } catch (error) {
      console.error(`Ошибка в методе createCollectionRecord()\n\n${error.message}`)
    }
  }

  /**
   * Поиск записи в колекции music по hashId
   * @param {hashId} hashId уникальный id трека в коллекции
   */
  async findTrackByHashId(hashId) {
    try {
      const response = await firebase
          .firestore()
          .collection('music')
          .where('hashId', '==', `${hashId}`)
          .get()

      const data = response.docs.map(track => ({...track.data()}))
      if (data.length > 0) {
        throw new Error('Трек с таким hashId уже существует!')
      } else {
        return false
      }
    } catch (error) {
      console.error(`Ошибка в методе findTrackByHashId()\n\n${error.message}`)
      return true
    }
  }
}
