class GetMessagesOfConver {
  _messagesRepo = null
  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }

  async invoke(converId) {
    try {
      return await this._messagesRepo.getMessagesOfConver(converId)
    } catch (err) {
      throw err
    }
  }
}

export default GetMessagesOfConver
