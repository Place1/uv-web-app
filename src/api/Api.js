import axios from 'axios';
import store from '../store';
import EventsApiResource from './EventsApiResource';

class Api {

  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    axios.interceptors.request.use(this.setAuthHeader);
  }

  endpoint(path) {
    return `${this.baseUrl}${path}/`;
  }

  setAuthHeader(config) {
    const newConfig = Object.assign({}, config);
    const jwt = store.getState().userInfo.jwt;
    newConfig.headers.Authorization = `JWT ${jwt}`;
    return newConfig;
  }

  getWebToken(username, password) {
    return axios({
      method: 'POST',
      url: this.endpoint('getWebToken'),
      data: { username, password },
    });
  }

  verifyWebToken(token) {
    return axios({
      method: 'POST',
      url: this.endpoint('verifyWebToken'),
      data: { token },
    });
  }

  get events() {
    return new EventsApiResource(this.endpoint('event'));
  }
}

const instance = new Api({
  baseUrl: process.env.UV_API_URL,
});

export default instance;
