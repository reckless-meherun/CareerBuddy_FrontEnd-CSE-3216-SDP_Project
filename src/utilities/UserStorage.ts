import { User } from "@/models/user";

class UserStorage {
  private static readonly USER_KEY = 'user';

  // Save user object to localStorage
  static saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Get user object from localStorage
  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Clear user data from localStorage
  static clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}

export default UserStorage;
