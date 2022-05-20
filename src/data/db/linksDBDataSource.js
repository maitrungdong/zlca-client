import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'links'
const ID_FIELD = 'linkId'

class LinksDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }

  init(db) {
    super.init(db)

    this.OBJ_STORE.createIndex('msgId', 'msgId', {
      unique: true,
    })
  }
}

const linksDBDataSource = new LinksDBDataSource(OBJ_STORE_NAME, ID_FIELD)
export default linksDBDataSource
