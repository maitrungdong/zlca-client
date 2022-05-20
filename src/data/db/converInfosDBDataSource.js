import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'converInfos'
const ID_FIELD = 'converInfoId'

class ConverInfosDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }

  init(db) {
    super.init(db)

    this.OBJ_STORE.createIndex('converId', 'converId', {
      unique: true,
    })
  }
}

const converInfosDBDataSource = new ConverInfosDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default converInfosDBDataSource
