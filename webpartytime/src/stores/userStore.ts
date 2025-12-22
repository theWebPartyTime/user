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
    generateUsername(): string {
      const username = generateUsername("", 1, 10);

      this.username = username;
      this.saveToLocalStorage();

      return username;
    },

    // Сохранить в localStorage
    saveToLocalStorage(): void {
      if (this.username) {
        localStorage.setItem("username", this.username);
      }
    },

    // Загрузить из localStorage
    loadFromLocalStorage(): void {
      const saved = localStorage.getItem("username");
      if (saved) {
        this.username = saved;
      } else {
        // Если нет сохраненного - генерируем новый
        this.generateUsername();
      }
    },

    // Изменить никнейм (пользователь вводит сам)
    setUsername(newUsername: string): boolean {
      if (newUsername.length < 2 || newUsername.length > 20) {
        return false;
      }

      this.username = newUsername;
      this.saveToLocalStorage();
      return true;
    },
  },
});

export default useUserStore;
