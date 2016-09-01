import axios from 'axios';
import store from '../store';

class EventsApiResource {
	constructor(url) {
		this._url = url;
	}

	trending() {
		return axios({
			method: 'GET',
			url: this._url + 'trending/',
		});
	}

	newEvents() {
		return axios({
			method: 'GET',
			url: this._url + 'new/',
		});
	}
}

export default EventsApiResource;
