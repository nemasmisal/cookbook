import BaseFetch from './baseFetch';
class AuthService {
  private AUTH_URL = 'auth/';
  async register(body: any) {
    return BaseFetch.baseHttp(this.AUTH_URL + 'register', 'post', body);
  }
  async login(body: any) {
    return BaseFetch.baseHttp( this.AUTH_URL + 'login', 'post', body);
  }
  async logout() {
    return BaseFetch.baseHttp(this.AUTH_URL + 'logout', 'get', null);
  }
}
export default new AuthService();