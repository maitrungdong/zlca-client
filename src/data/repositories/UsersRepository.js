import usersAPIDataSource from 'data/api/dataSources/usersAPIDataSource.js'

class UsersRepository {
  async searchUsersByKeyword(keyword) {
    try {
      const res = await usersAPIDataSource.searchUsersByKeyword(keyword)
      return res
    } catch (err) {
      throw err
    }
  }
}

const usersRepository = new UsersRepository()
export default usersRepository
