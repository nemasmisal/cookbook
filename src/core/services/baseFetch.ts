interface Headers {
  withBody: Function;
}
class BaseFetch {
  private BASE_URL = "http://localhost:8081/api/"
  private headers: Headers = {
    withBody(body: any, method: string) {
      return {
        method: method.toUpperCase(),
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Headers": true },
        body: JSON.stringify(body)
      }
    }
  }
  async baseHttp(endpoint: string, method: string, body: any) {
    try {
      const _res = await fetch(this.BASE_URL + endpoint, body ? this.headers.withBody(body, method) : null);
      const res = await _res.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new BaseFetch();