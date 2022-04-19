class SwitchCurrentConver {
  _conversRepo = null
  constructor(conversRepo) {
    this._conversRepo = conversRepo
  }
  async invoke(newCurrentConver) {
    await this._conversRepo.switchCurrentConver(newCurrentConver)
  }
}

export default SwitchCurrentConver
