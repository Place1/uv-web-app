import Api from '../api';

const LOGIN = 'LOGIN';

function login(username, password) {
  return {
    type: LOGIN,
    payload: Api.getWebToken(username, password)
      .then(response => response.data),
  };
}

export { login };
export { LOGIN };
