import Api from '../api';

export const VERIFY_TOKEN = 'VERIFY_TOKEN';

function verifyToken(token) {
  return {
    type: VERIFY_TOKEN,
    payload: Api.verifyWebToken(token)
      .then(res => res.status === 200)
      .catch(() => false),
  };
}

export default verifyToken;
