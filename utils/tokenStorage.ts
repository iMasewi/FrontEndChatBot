export class TokenStorage {
  private static readonly TOKEN_KEY = 'token'

  // SSR-safe: kiểm tra có phải đang chạy trên browser không
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  }

  // Lấy token từ localStorage
  static getToken(): string | null {
    if (!this.isBrowser()) return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  // Lưu token vào localStorage
  static setToken(token: string): void {
    if (!this.isBrowser()) return
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  // Xóa token
  static removeToken(): void {
    if (!this.isBrowser()) return
    localStorage.removeItem(this.TOKEN_KEY)
  }

  // Kiểm tra xem đã có token chưa
  static hasToken(): boolean {
    return !!this.getToken()
  }

  // Trả về Bearer token cho Authorization
  static getBearerToken(): string | null {
    const token = this.getToken()
    return token ? `Bearer ${token}` : null
  }
}