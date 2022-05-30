import authStore from 'stores/AuthStore.js'

import searchUsersByKeywordUseCase from 'usecases/users/SearchUsersByKeyword.js'

class UsersManager {
  standardUser(user) {}

  async searchUsersByKeyword(keyword) {
    try {
      let res = await searchUsersByKeywordUseCase.invoke(keyword)
      const me = authStore.getMe()

      res = res.filter((user) => user.id !== me.id)

      return res
    } catch (err) {
      console.log({ err })
    }
  }
}

const usersManager = new UsersManager()
export default usersManager
