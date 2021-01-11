const JWT = require('../config/jwt');
const _ = require('lodash');

exports.validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    let customError = {};
    error.details.map((item) => {
      customError[item.path] = _.upperFirst(
        _.toLower(_.startCase(_.toLower(item.message)))
      ).replace('id ', '');
    });
    return response.validationError(
      res,
      'The given data was invalid.',
      customError
    );
  } else next();
};

exports.validateToken = () => (req, res, next) => {
  const token = extractToken(req);
  if (token) {
    try {
      const user = JWT.verify(token);
      req.params['user'] = user;
      next();
    } catch (error) {
      // log.error(error)
      if (error.message && error.message.includes('jwt expired')) {
        response.unauthorizedError(res);
      } else response.forbiddenError(res);
    }
  } else res.status(404).send('Token not found.');
};

exports.validateBodyWithToken = (schema) => (req, res, next) => {
  const token = extractToken(req);
  let customError = {};

  if (token) {
    try {
      const user = JWT.verify(token);
      req.params['user'] = user;
      const { error } = schema.validate(req.body);
      if (error) {
        error.details.map((item) => {
          customError[item.path] = _.upperFirst(
            _.toLower(_.startCase(_.toLower(item.message)))
          ).replace('id ', '');
        });
        return response.validationError(
          res,
          'The given data was invalid.',
          customError
        );
      } else next();
    } catch (error) {
      // log.error(error)
      if (error.code && error.code === 'ERR_JWT_CLAIM_INVALID')
        response.unauthorizedError(res);
      else if (error.message && error.message.includes('jwt expired'))
        response.unauthorizedError(res);
      else response.forbiddenError(res);
    }
  } else res.status(404).send('Token not found.');
};

const extractToken = (req) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && ['Token', 'Bearer'].includes(token.split(' ')[0]))
    return token.split(' ')[1];
  else return null;
};
