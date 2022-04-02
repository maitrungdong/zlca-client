//If we use typescript, we can define interface for the repository, and... for service

class AuthService {
  constructor(authRepo) {
    this.authRepo = authRepo
  }

  async login(phoneNumber, password) {
    this.authRepo.login(phoneNumber, password)
  }

  async logout() {
    this.authRepo.logout()
  }

  async register(userData) {
    this.authRepo.register(userData)
  }
}

export default AuthService
