import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'htmlContents'
const ID_FIELD = 'htmlContentId'

class HTMLContentsDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }

  init(db) {
    super.init(db)

    this.OBJ_STORE.createIndex('msgId', 'msgId', { unique: true })
  }
}

const htmlContentsDBDataSource = new HTMLContentsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default htmlContentsDBDataSource
