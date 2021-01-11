const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const refreshKey = process.env.REFRESH_KEY;
class JWT {
  constructor(email, id) {
    this.email = email;
    this.id = id;
  }

  static verify(token) {
    try {
      const decode = jwt.verify(token, privateKey);
      if (!decode.key) throw new Error('Invalid JWT');
      return decode.key;
    } catch (error) {
      throw error;
    }
  }

  generate(callback) {
    const token = jwt.sign({ email: this.email, key: this.id }, privateKey, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ email: this.email }, refreshKey, {
      expiresIn: '13h',
    });
    callback(undefined, token, refreshToken);
  }

  refresh(token, callback) {
    try {
      const decode = jwt.verify(token, refreshKey);
      if (!decode.email) throw new Error('Invalid JWT');
      const newToken = jwt.sign(
        { email: this.email, key: this.id },
        privateKey,
        { expiresIn: '1h' }
      );
      callback(undefined, newToken);
    } catch (error) {
      callback(error, undefined);
    }
  }
}

module.exports = JWT;
