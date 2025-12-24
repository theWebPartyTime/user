import { defineStore } from 'pinia'
import { generateUsername as generateRandomUsername } from 'unique-username-generator'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as {
          id: number | null
          email: string | null
          username: string | null
        } | null,
        accessToken: null as string | null,
        refreshToken: null as string | null,
        isAuthenticated: false
      }),
  
  actions: {
    setAuthData(authResponse: {
      user: { id: number; email: string }
      access_token: string
      refresh_token: string
    }) {
      const username = generateRandomUsername('', 1, 10)
      this.user = {
        id: authResponse.user.id,
        email: authResponse.user.email,
        username: username
      }
      this.accessToken = authResponse.access_token
      this.refreshToken = authResponse.refresh_token
      this.isAuthenticated = true
      
      this.saveToLocalStorage()
    },
    
    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false
      this.clearLocalStorage()
    },
    
    loadFromLocalStorage() {
      const saved = localStorage.getItem('auth')
      if (saved) {
        try {
          const authData = JSON.parse(saved)
          this.user = authData.user
          this.accessToken = authData.accessToken
          this.refreshToken = authData.refreshToken
          this.isAuthenticated = true
        } catch (e) {
          this.clearLocalStorage()
        }
      }
    },

    setUsername(newUsername: string): boolean {
        if (!this.user || newUsername.length < 2 || newUsername.length > 20) {
          return false
        }
        this.user.username = newUsername
        this.saveToLocalStorage()
        return true
    },
    
    saveToLocalStorage() {
      const dataToSave = {
        user: this.user,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      }
      console.log(dataToSave)
      localStorage.setItem('auth', JSON.stringify(dataToSave))
    },
    
    clearLocalStorage() {
      localStorage.removeItem('auth')
    },

    generateUsername(): string {
      const username = generateRandomUsername('', 1, 10)
      if (this.user) {
        this.user.username = username
      }
      console.log(username)
      this.saveToLocalStorage()
      return username
    }
  }
})