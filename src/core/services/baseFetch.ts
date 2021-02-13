import store from "@/store/";
class BaseFetch {
  private BASE_URL = "/api/";
  private headers = (body: any, method: string) => {
    return {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "true"
      },
      body: JSON.stringify(body)
    };
  };
  async baseHttp(endpoint: string, method: string, body: any) {
    try {
      const _res = await fetch(
        this.BASE_URL + endpoint,
        body ? this.headers(body, method) : undefined
      );
      const res = await _res.json();
      if (!_res.ok) {
        return store.dispatch("globalError", { msg: res.msg });
      }
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
