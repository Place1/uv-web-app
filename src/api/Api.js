import axios from 'axios';

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
}

const instance = new Api({
	baseUrl: process.env.UV_API_URL,
})

export default instance;
