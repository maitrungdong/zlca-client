class SaveNewMessage {
  _messagesRepo = null
  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }
  async invoke(newMessage) {
    try {
      return await this._messagesRepo.saveNewMessage(newMessage)
    } catch (err) {
      throw err
    }
  }
}

export default SaveNewMessage
