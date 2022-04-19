class SaveNewMessage {
  _messagesRepo = null
  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }
  async invoke(newMessage) {
    await this._messagesRepo.saveNewMessage(newMessage)
  }
}

export default SaveNewMessage
