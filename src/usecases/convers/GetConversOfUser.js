import conversRepository from 'data/repositories/ConversRepository.js'

class GetConversOfUser {
  _conversRepo = null
  constructor(conversRepo) {
    this._conversRepo = conversRepo
  }

  async invoke(data, options = { shouldNotify: false }) {
    try {
      return await this._conversRepo.getConversOfUser(data.userId)
    } catch (err) {
      throw err
    }
  }
}

const getConversOfUser = new GetConversOfUser(conversRepository)

export default getConversOfUser
