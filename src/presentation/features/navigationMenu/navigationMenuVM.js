import Logout from 'domain/usecases/Auth/Logout'
import authRepository from 'infrastructure/repositories/AuthRepository'

export default function NavigationMenuVM() {
  const logout = (userId) => {
    const uc = new Logout(authRepository)
    uc.invoke(userId)
  }

  return {
    logout,
  }
}
