import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'groupReminders'
const ID_FIELD = 'groupReminderId'

class GroupRemindersDBDataSource extends BaseDBDataSource {
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

const groupRemindersDBDataSource = new GroupRemindersDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default groupRemindersDBDataSource
