import axios from 'axios';
import moment from 'moment';

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

  upcomingEvents() {
    return this.get({
      after: moment().startOf('day').toISOString(),
    });
  }
}

export default EventsApiResource;
