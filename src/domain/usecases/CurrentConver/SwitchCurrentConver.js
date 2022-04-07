class SwitchCurrentConver {
  _currentConverRepo = null
  constructor(currentConverRepo) {
    this._currentConverRepo = currentConverRepo
  }
  async invoke(newCurrentConver) {
    await this._currentConverRepo.switchCurrentConver(newCurrentConver)
  }
}

export default SwitchCurrentConver
