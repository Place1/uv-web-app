import axios from 'axios';

class EventsApiResource {
  constructor(url) {
    this.url = url;
  }

  get(params) {
    return axios({
      method: 'GET',
      url: this.url,
      params,
    });
  }

  trending() {
    return axios({
      method: 'GET',
      url: `${this.url}trending/`,
    });
  }

  newEvents() {
    return axios({
      method: 'GET',
      url: `${this.url}new/`,
    });
  }
}

export default EventsApiResource;
