import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'friends'
const ID_FIELD = 'friendId'

class FriendsDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }
}

const friendsDBDataSource = new FriendsDBDataSource(OBJ_STORE_NAME, ID_FIELD)

export default friendsDBDataSource
