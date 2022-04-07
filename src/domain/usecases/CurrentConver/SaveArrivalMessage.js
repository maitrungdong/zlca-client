class SaveArrivalMessage {
  _currentConverRepo = null
  constructor(currentConverRepo) {
    this._currentConverRepo = currentConverRepo
  }
  async invoke(arrivalMessage) {
    await this._currentConverRepo.saveArrivalMessage(arrivalMessage)
  }
}

export default SaveArrivalMessage
