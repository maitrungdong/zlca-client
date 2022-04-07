class GetConversOfUser {
  _conversRepo = null
  constructor(conversRepo) {
    this._conversRepo = conversRepo
  }

  async invoke(userId) {
    await this._conversRepo.getConversOfUser(userId)
  }
}

export default GetConversOfUser
