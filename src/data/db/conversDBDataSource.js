import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'conversations'
const ID_FIELD = 'converId'

class ConversDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }
}

const conversDBDataSource = new ConversDBDataSource(OBJ_STORE_NAME, ID_FIELD)
export default conversDBDataSource
