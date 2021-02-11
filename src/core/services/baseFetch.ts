import store from "@/store/";
interface Headers {
  withBody: Function;
}
class BaseFetch {
  private BASE_URL = "api/";
  private headers: Headers = {
    withBody(body: any, method: string) {
      return {
        method: method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": true
        },
        body: JSON.stringify(body),
        credentials: "include"
      };
    }
  };
  async baseHttp(endpoint: string, method: string, body: any) {
    try {
      const headers = body ? this.headers.withBody(body, method) : null;
      console.log(headers);
      console.log(this.BASE_URL + endpoint);
      const _res = await fetch(this.BASE_URL + endpoint, headers);
      if (!_res.ok) {
        return store.dispatch("globalError", _res);
      }
      const res = await _res.json();
      if (res.msg) {
        store.dispatch("globalMsg", { msg: res.msg });
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
export default new BaseFetch();
