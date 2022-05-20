class BaseDBDataSource {
  constructor(objStoreName, idField) {
    this.OBJ_STORE_NAME = objStoreName
    this.ID_FIELD = idField
  }

  setDB(db) {
    this.DB = db
  }

  init(db) {
    this.setDB(db)

    this.OBJ_STORE = this.DB.createObjectStore(this.OBJ_STORE_NAME, {
      keyPath: this.ID_FIELD,
    })
  }

  _makeTransaction(mode) {
    return this.DB.transaction(this.OBJ_STORE_NAME, mode)
  }

  //TODO: tạo các helper func để hỗ trợ việc tạo transactions, errors catching,...

  async getAll() {
    return new Promise((resolve, reject) => {
      let result = null
      let tx = this._makeTransaction('readonly')
      tx.oncomplete = (e) => {
        resolve(result)
      }
      tx.onerror = (e) => {
        reject(e)
      }
      const objStore = tx.objectStore(this.OBJ_STORE_NAME)
      objStore.openCursor().onsuccess = function (e) {
        let cursor = e.target.result
        if (cursor) {
          result.push(cursor.value)
          cursor.continue()
        }
      }
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      let result = null
      let tx = this._makeTransaction('readonly')
      tx.oncomplete = (e) => {
        resolve(result)
      }
      tx.onerror = (e) => {
        reject(e)
      }
      const objStore = tx.objectStore(this.OBJ_STORE_NAME)
      const getReq = objStore.get(id)
      getReq.onsuccess = (e) => {
        result = e.target.result
      }
    })
  }

  async create(entity) {
    return new Promise((resolve, reject) => {
      let result = null

      let tx = this._makeTransaction('readwrite')
      tx.oncomplete = (e) => {
        resolve(result)
      }
      tx.onerror = (e) => {
        reject(e)
      }

      const objStore = tx.objectStore(this.OBJ_STORE_NAME)
      const addReq = objStore.add(entity)
      addReq.onsuccess = (e) => {
        result = entity
      }
    })
  }

  async deleteById(id) {
    return new Promise((resolve, reject) => {
      let result = false

      let tx = this._makeTransaction('readwrite')
      tx.oncomplete = (e) => {
        resolve(result)
      }
      tx.onerror = (e) => {
        reject(e)
      }

      const objStore = tx.objectStore(this.OBJ_STORE_NAME)
      const deleteReq = objStore.delete(id)
      deleteReq.onsuccess = (e) => {
        result = true
      }
    })
  }

  async update(newEntity) {
    return new Promise((resolve, reject) => {
      let result = null

      let tx = this._makeTransaction('readwrite')
      tx.oncomplete = (e) => {
        resolve(result)
      }
      tx.onerror = (e) => {
        reject(e)
      }

      const objStore = tx.objectStore(this.OBJ_STORE_NAME)
      const updateReq = objStore.put(newEntity)
      updateReq.onsuccess = (e) => {
        result = newEntity
      }
    })
  }
}

export default BaseDBDataSource
