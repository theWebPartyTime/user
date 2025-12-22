import { defineStore } from 'pinia'
import { generateUsername } from 'unique-username-generator'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null as string | null,
    email: null as string | null,
    token: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    generateUsername(): string {
      const username = generateUsername('', 1, 10)
      this.username = username
      localStorage.setItem('username', username)
      return username
    },
    
    loadFromLocalStorage(): void {
      const saved = localStorage.getItem('username')
      if (saved) {
        this.username = saved
      } else {
        this.generateUsername()
      }
    },
    
    setUsername(newUsername: string): boolean {
      if (newUsername.length < 2 || newUsername.length > 20) {
        return false
      }
      this.username = newUsername
      localStorage.setItem('username', newUsername)
      return true
    },

    loginSuccess(email: string, token: string) {
      this.email = email
      this.token = token
      localStorage.setItem('user_email', email)
      localStorage.setItem('user_token', token)
    },
    
    logout() {
      this.email = null
      this.token = null
      localStorage.removeItem('user_email')
      localStorage.removeItem('user_token')
    },
    
    checkStoredAuth() {
      const email = localStorage.getItem('user_email')
      const token = localStorage.getItem('user_token')
      
      if (email && token) {
        this.email = email
        this.token = token
        return true
      }
      return false
    }
  }
})

export default useUserStore