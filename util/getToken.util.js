const jwtDecode = require('jwt-decode');

const getToken = (headers) => {
  const token = headers['x-access-token'] || headers['authorization'];
  if (token && ['Token', 'Bearer'].includes(token.split(' ')[0])) {
    let doc = token.split(' ')[1];
    let decoded = jwtDecode(doc);
    return decoded;
  } else return null;
};

module.exports = getToken;
