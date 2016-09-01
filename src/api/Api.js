import axios from 'axios';
import store from '../store';
import EventsApiResource from './EventsApiResource';

class Api {

	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
		axios.interceptors.request.use(this._setAuthHeader);
	}

	_endpoint(path) {
		return `${this._baseUrl}${path}/`
	}

	_setAuthHeader(config) {
		const jwt = store.getState().userInfo.jwt;
		config.headers['Authorization'] = `JWT ${jwt}`;
		return config;
	}

	getWebToken(username, password) {
		return axios({
			method: 'POST',
			url: this._endpoint('getWebToken'),
			data: { username, password }
		});
	}

	verifyWebToken(token) {
		return axios({
			method: 'POST',
			url: this._endpoint('verifyWebToken'),
			data: { token }
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
