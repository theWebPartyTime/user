import { defineStore } from "pinia";
import { generateUsername } from "unique-username-generator";

interface UserState {
  username: string | null;
  authorized: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: null,
    authorized: false,
  }),

  actions: {
    init(): void {
      this.loadFromLocalStorage();
    },
    generateUsername(): string {
      const username = generateUsername('', 1, 10)
      this.username = username
      this.saveToLocalStorage()
      return username
    },
    
    saveToLocalStorage(): void {
      if (this.username) {
        localStorage.setItem('username', this.username)
      } else {
        localStorage.removeItem('username');
      }
    },
    
    loadFromLocalStorage(): void {
      const saved = localStorage.getItem("username");
      if (saved) {
        this.username = saved;
      } else {
        this.generateUsername()
      }
    },
    
    setUsername(newUsername: string): boolean {
      if (newUsername.length < 2 || newUsername.length > 20) {
        return false;
      }
      this.username = newUsername
      this.saveToLocalStorage()
      return true
    },
    
    clearUserData(): void {
      this.username = null;
      localStorage.removeItem('username');
    }
  }
})

export default useUserStore;
