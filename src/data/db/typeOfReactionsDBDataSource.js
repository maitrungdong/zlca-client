import BaseDBDataSource from './BaseDBDataSource.js'

const OBJ_STORE_NAME = 'typeOfReactions'
const ID_FIELD = 'torId'

class TypeOfReactsDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }
}

const typeOfReactsDBDataSource = new TypeOfReactsDBDataSource(
  OBJ_STORE_NAME,
  ID_FIELD
)
export default typeOfReactsDBDataSource
