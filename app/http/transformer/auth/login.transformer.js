const resource = require('../../../../config/tramsformer');
class userTransformer extends resource {
  toArray() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      tokenType: 'Bearer',
      expiresIn: '1h',
    };
  }
}

module.exports = userTransformer;
