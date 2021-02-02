class AuthService {
  private BASE_URL = "http://localhost:8081/api/auth/"
  private headers = {
    post (body: any) {
      return { method: 'POST',
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(body) 
       }
    }
  }
  async register(body: any) {
    try {
      const _res = await fetch(this.BASE_URL + 'register', this.headers.post(body));
     const res = await _res.json();
     return res;
    } catch (error) {
      console.log(error);
    }
  }
  async login(body: any) {
    try {
      const _res = await fetch(this.BASE_URL + 'login', this.headers.post(body));
      const res = await _res.json();
      return res;
    } catch (error) {
      console.log(error);
    }

  }
}

export default new AuthService();