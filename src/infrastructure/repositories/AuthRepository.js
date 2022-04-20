import authAPIDataSource from 'infrastructure/api/authAPIDataSource.js'

class AuthRepository {
  async login(userInfo) {
    try {
      //Gọi từ API, nếu có cache thì lấy trong cache hoặc chọc xuống DB để
      //lấy.
      return await authAPIDataSource.login(userInfo)
    } catch (err) {
      throw err
    }
  }
  async logout(userId) {
    try {
      //Gọi từ API, nếu có cache thì lấy trong cache hoặc chọc xuống DB để
      //lấy.
      return await authAPIDataSource.logout(userId)
    } catch (err) {
      throw err
    }
  }

  async register(userInfo) {
    try {
      //Gọi từ API, nếu có cache thì lấy trong cache hoặc chọc xuống DB để
      //lấy.
      //Lấy xong rồi thì có thể lưu vào cache, hoặc vào local DB...
      return await authAPIDataSource.register(userInfo)
    } catch (err) {
      throw err
    }
  }
}

const authRepository = new AuthRepository()
export default authRepository
