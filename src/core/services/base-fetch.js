import store from '@/store/';
class BaseFetch {
  BASE_URL = 'https://nemasmisal.online/api/';
  headers = (body, method) => {
    return {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'true',
      },
      body: JSON.stringify(body),
    };
  };
  async baseHttp(endpoint, method, body, query) {
    try {
      const url = new URL(this.BASE_URL + endpoint);
      query ? (url.search = new URLSearchParams(query)) : null;
      const _res = await fetch(
        url,
        body ? this.headers(body, method) : null
      );
      const res = await _res.json();
      if (!_res.ok) {
        return store.dispatch('msg/globalError', { msg: res.msg });
      }
      if (res.msg) {
        store.dispatch('msg/globalMsg', { msg: res.msg });
      }
      return res;
    } catch (err) {
      store.dispatch('msg/globalError', {
        msg: 'something went wrong :/',
      });
    }
  }
}
export default new BaseFetch();
