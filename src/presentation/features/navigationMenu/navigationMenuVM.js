import authManager from 'domain/managers/AuthManager.js'

export default function NavigationMenuVM() {
  const logout = async (userId) => {
    await authManager.logout(userId)
  }

  return {
    logout,
  }
}
