import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'groupNotes'
const ID_FIELD = 'groupNoteId'

class GroupNotesDBDataSource extends BaseDBDataSource {
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

const groupNotesDBDataSource = new GroupNotesDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default groupNotesDBDataSource
