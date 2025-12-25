// import { useUserStore } from '../stores/userStore'

const API_URL = 'https://api.webparty.fun'

export const authApi = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Неверный email или пароль')
    }
    
    return response.json()
  },
  
  async register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Ошибка регистрации')
    }
    
    return response.json()
  },

  async refreshToken(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    
    if (!response.ok) {
      throw new Error('Не удалось обновить токен')
    }
    
    return response.json()
  },
}