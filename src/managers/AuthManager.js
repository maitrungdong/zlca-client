import authStore from 'stores/AuthStore.js'

import Login from 'usecases/auth/Login.js'
import Logout from 'usecases/auth/Logout'
import Register from 'usecases/auth/Register'

import authRepository from 'data/repositories/AuthRepository'

class AuthManager {
  async login(userInfo) {
    try {
      authStore.loginLoading()
      //[TODO]: sử dụng loginUseCase để thực hiện login.
      const uc = new Login(authRepository)
      const res = await uc.invoke(userInfo)

      /** [NOTE]: Tại sao e lại đem việc xử lý thông báo lỗi lên đây?
       * Bởi vì, theo như e thấy thì việc xử lý thông báo lỗi. Nó là của
       * UI. (Nó gần với UI hơn). Nếu như để việc xử lý thông báo lỗi ở
       * Repository thì nó không hợp lý. Bởi vì, Repository là nơi quản lý
       * business data. Nó có nhiệm vụ là save, update, delete business data.
       * Còn việc xử lý sau khi update có thành công hay thất bại thì ko phải việc của nó!
       * Repo nó sẽ throw cái error này và Manager có nhiệm vụ xử lý error này. Sau đó, nó
       * forward lên tầng trên để hiển thị chẳng hạn...
       * Note thêm...Tầng network (api) có có nhiệm vụ là sau khi get không thành công,
       * thì nó sẽ cố gắng get thêm một vài lần nữa (đang ví dụ). Nếu không được nữa, thì nó
       * sẽ trả kết quá (lỗi) về cho Repo và Repo lại throw cái lỗi này cho các tầng ở phía
       * trên xử lý.
       */

      authStore.loginSuccess(res)
    } catch (err) {
      authStore.loginFailed(err.message)
    }
  }

  async logout(userId) {
    try {
      const uc = new Logout(authRepository)
      await uc.invoke(userId)

      authStore.logoutSuccess()
    } catch (err) {}
  }

  async register(userInfo) {
    try {
      debugger
      authStore.registerLoading()

      const uc = new Register(authRepository)
      const res = await uc.invoke(userInfo)

      authStore.registerSuccess(res)
    } catch (err) {
      authStore.registerFailed(err.message)
    }
  }
}

const authManager = new AuthManager()
export default authManager
