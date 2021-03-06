import BaseFetch from './base-fetch';
class AuthService {
  AUTH_URL = 'auth/';
  async register(body) {
    return BaseFetch.baseHttp(this.AUTH_URL + 'register', 'post', body);
  }
  async login(body) {
    return BaseFetch.baseHttp(this.AUTH_URL + 'login', 'post', body);
  }
  async logout() {
    return BaseFetch.baseHttp(this.AUTH_URL + 'logout', 'get', null);
  }
  async isAvailable(body) {
    return BaseFetch.baseHttp(this.AUTH_URL + 'isAvailable', 'post', body);
  }
}
export default new AuthService();
