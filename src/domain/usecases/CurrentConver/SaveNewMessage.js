class SaveNewMessage {
  _currentConverRepo = null
  constructor(currentConverRepo) {
    this._currentConverRepo = currentConverRepo
  }
  async invoke(newMessage) {
    await this._currentConverRepo.saveNewMessage(newMessage)
  }
}

export default SaveNewMessage
