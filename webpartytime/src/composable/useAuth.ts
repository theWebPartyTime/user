import { authApi } from '../services/auth'
import { useUserStore } from '../stores/userStore'
import { ref } from 'vue'

export function useAuth() {
  const userStore = useUserStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const authResponse = await authApi.login(email, password)
      userStore.setAuthData(authResponse)
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка авторизации'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const register = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const authResponse = await authApi.register(email, password)
      userStore.setAuthData(authResponse)
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка регистрации'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  const logout = () => {
    userStore.logout()
  }
  
  const initAuth = () => {
    userStore.loadFromLocalStorage()
  }
  
  return {
    user: userStore.user,
    isAuthenticated: userStore.isAuthenticated,
    isLoading,
    error,
    
    login,
    register,
    logout,
    initAuth
  }
}