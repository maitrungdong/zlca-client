import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'reactions'
const ID_FIELD = 'reactionId'

class ReactionsDBDataSource extends BaseDBDataSource {
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

const reactionsDBDataSource = new ReactionsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default reactionsDBDataSource
