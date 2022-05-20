import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'participants'
const ID_FIELD = 'participantId'

class ParticipantsDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }

  init(db) {
    super.init(db)

    this.OBJ_STORE.createIndex('userId', 'userId', {
      unique: false,
    })
  }
}

const participantsDBDataSource = new ParticipantsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)

export default participantsDBDataSource
