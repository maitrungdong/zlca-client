import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'groupSettings'
const ID_FIELD = 'groupSettingId'

class GroupSettingsDBDataSource extends BaseDBDataSource {
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

const groupSettingsDBDataSource = new GroupSettingsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default groupSettingsDBDataSource
