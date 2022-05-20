import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'groupInfos'
const ID_FIELD = 'groupInfoId'

class GroupInfosDBDataSource extends BaseDBDataSource {
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

const groupInfosDBDataSource = new GroupInfosDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default groupInfosDBDataSource
