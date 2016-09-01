import axios from 'axios';
import EventsApiResource from './EventsApiResource';

class Api {

	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	_endpoint(path) {
		return `${this._baseUrl}${path}/`
	}

	getWebToken(username, password) {
		return axios({
			method: 'POST',
			url: this._endpoint('getWebToken'),
			data: { username, password }
		});
	}

	get events() {
		return new EventsApiResource(this._endpoint('event'));
	}
}

const instance = new Api({
	baseUrl: process.env.UV_API_URL,
})

export default instance;
