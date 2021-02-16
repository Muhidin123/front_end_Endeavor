class Fetch {
  constructor() {}
  makeOptions(method, body = {}) {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  generalFetch(url, options = {}) {
    return fetch(url, options).then(res => res.json());
  }

  makeOptionsOnRefresh(method, body = {}, token = "") {
    return {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
  }
}
export default Fetch;