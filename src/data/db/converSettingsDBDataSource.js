import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'converSettings'
const ID_FIELD = 'converSettingId'

class ConverSettingsDBDataSource extends BaseDBDataSource {
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

const converSettingsDBDataSource = new ConverSettingsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default converSettingsDBDataSource
