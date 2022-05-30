import messagesRepository from 'data/repositories/MessagesRepository.js'

class GetMessagesOfConver {
  _messagesRepo = null

  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }

  async invoke(data, options = { shouldNotify: false }) {
    try {
      return await this._messagesRepo.getMessagesOfConver(data.converId)
    } catch (err) {
      throw err
    }
  }
}

const getMessagesOfConverUseCase = new GetMessagesOfConver(messagesRepository)

export default getMessagesOfConverUseCase
