import axios from 'axios';
import store from '../store';

class EventsApiResource {
	constructor(url) {
		this._url = url;
		this.headers = {
			Authorization: `JWT ${store.getState().userInfo.jwt}`
		}
	}

	trending() {
		return axios({
			method: 'GET',
			url: this._url + 'trending/',
			headers: this.headers,
		});
	}

	newEvents() {
		return axios({
			method: 'GET',
			url: this._url + 'new/',
			headers: this.headers,
		});
	}
}

export default EventsApiResource;
