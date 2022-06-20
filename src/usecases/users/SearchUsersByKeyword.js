import usersRepository from 'data/repositories/UsersRepository.js'

class SearchUsersByKeyword {
  _usersRepo = null

  constructor(usersRepo) {
    this._usersRepo = usersRepo
  }

  async invoke(keyword) {
    try {
      const standardedKeyword = keyword.trim()
      if (standardedKeyword === '') return []
      return await this._usersRepo.searchUsersByKeyword(standardedKeyword)
    } catch (err) {
      throw err
    }
  }
}

const searchUsersByKeywordUseCase = new SearchUsersByKeyword(usersRepository)
export default searchUsersByKeywordUseCase
