const { User } = require('../../models');

const JWT = require('../../../config/jwt');
const V = require('voca');
const bcrypt = require('bcryptjs');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('auth.controller.js');

/**
 *
 * @param {*} values
 */
exports.authenticate = (values) =>
  new Promise((resolve, reject) => {
    if (!values.email) reject(new Error(`E-mail can't be empty`));
    if (!values.password) reject(new Error(`Password can't be empty`));

    User.findOne({
      where: { email: V.lowerCase(values.email), is_active: true },
    })
      .then((doc) => {
        if (!doc) throw new Error('No User Found');
        const passwordIsValid = bcrypt.compareSync(
          values.password,
          doc.password
        );
        if (!passwordIsValid) reject(new Error(`Invalid password!!`));

        const id = `${doc.id}`;
        const email = `${doc.email}`;

        if (cache.has(id)) {
          const { accessToken, refreshToken } = cache.get(id);
          resolve({ accessToken, refreshToken });
        } else {
          new JWT(doc.email, doc.id).generate(
            (err, accessToken, refreshToken) => {
              if (err) throw err;
              cache.set(id, { accessToken, refreshToken, email }, 43200);
              resolve({ accessToken, refreshToken });
            }
          );
        }
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

exports.user = (headers) =>
  new Promise((resolve, reject) => {
    User.findOne({
      attributes: ['id', 'name', 'email', 'email_verified_at', 'is_active', 'created_at'],
      where: { id: getToken(headers).key },
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
