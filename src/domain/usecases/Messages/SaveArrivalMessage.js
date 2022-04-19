class SaveArrivalMessage {
  _messagesRepo = null
  constructor(messagesRepo) {
    this._messagesRepo = messagesRepo
  }
  async invoke(arrivalMessage) {
    await this._messagesRepo.saveArrivalMessage(arrivalMessage)
  }
}

export default SaveArrivalMessage
