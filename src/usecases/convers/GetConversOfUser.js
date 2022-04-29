class GetConversOfUser {
  _conversRepo = null
  constructor(conversRepo) {
    this._conversRepo = conversRepo
  }

  async invoke(userId) {
    try {
      return await this._conversRepo.getConversOfUser(userId)
    } catch (err) {
      throw err
    }
  }
}

export default GetConversOfUser
