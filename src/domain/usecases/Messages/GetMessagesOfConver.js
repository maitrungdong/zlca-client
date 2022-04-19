class GetMessagesOfConver {
  _messagesRepo = null
  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }

  async invoke(converId) {
    await this._messagesRepo.getMessagesOfConver(converId)
  }
}

export default GetMessagesOfConver
